import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const ROOT_DIR = process.cwd();
const SCRIPT_NAME = process.argv.slice(2);

/**
 * Находим проекты из workspaces
 */
function findProjects() {
    const rootPackageJson = JSON.parse(
        fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf-8")
    );

    const workspaces = rootPackageJson.workspaces || [];
    let projects = [];

    for (const workspace of workspaces) {
        const baseDir = workspace.replace("/**", "");
        const absBaseDir = path.join(ROOT_DIR, baseDir);

        if (!fs.existsSync(absBaseDir)) continue;
        projects = [...projects, ...findPackageJson(absBaseDir)]
    }

    return projects;
}

function findPackageJson(curDir, projects = []) {
    let newProjects = [...projects];
    const dirs = (fs.readdirSync(curDir, { withFileTypes: true })).filter((dir) => dir.isDirectory());

    if (!dirs.length) return newProjects;

    for (const dir of dirs) {
        const projectDir = path.join(curDir, dir.name);
        const packageJsonPath = path.join(projectDir, "package.json");

        if (fs.existsSync(packageJsonPath)) {
            newProjects = [...newProjects, {
                name: dir.name,
                dir: projectDir,
                packageJson: JSON.parse(
                    fs.readFileSync(packageJsonPath, "utf-8")
                ),
            }];
        } else {
            newProjects = findPackageJson(projectDir, newProjects)
        }
    }

    return newProjects;
}

/**
 * Запускаем build или пропускаем
 */
function runScript(project) {
    return new Promise((resolve, reject) => {
        if (!project.packageJson.scripts[SCRIPT_NAME]) {
            const line = `[${project.name}] skipped (no ${SCRIPT_NAME})`;
            resolve(line);
            return;
        }

        exec(`npm run ${SCRIPT_NAME}`, { cwd: project.dir }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            const line = `[${project.name}] ${SCRIPT_NAME} finished`;
            resolve(line);
        });
    });
}

async function run() {
    const projects = findProjects();
    const results = [];

    for (const project of projects) {
        const result = await runScript(project);
        results.push(result)
    }
    debugger;
    return results;
}
const results = await run();
console.log(results.join("\n"));
