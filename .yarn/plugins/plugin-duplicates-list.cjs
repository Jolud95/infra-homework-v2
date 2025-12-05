module.exports = {
    name: 'plugin-duplicates-list',
    factory: require => {
        const {BaseCommand} = require('@yarnpkg/cli');
        const {Configuration, Project, structUtils} = require('@yarnpkg/core');

        class DuplicatesCommand extends BaseCommand {
            static paths = [['duplicates']];

            async execute() {
                // Получаем конфигурацию и проект
                const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
                const {project} = await Project.find(configuration, this.context.cwd);

                // Восстанавливаем состояние установки
                await project.restoreInstallState();

                // Map для хранения версий пакетов
                const duplicatesMap = new Map();

                project.storedPackages.values().forEach((pkg) => {
                    if (!structUtils.isVirtualLocator(pkg)) {
                        const name = pkg.name;
                        const version = pkg.version;

                        if (!duplicatesMap.has(name)) {
                            duplicatesMap.set(name, new Set());
                        }

                        duplicatesMap.get(name).add(version);
                    }
                });

                // Фильтруем пакеты с более чем одной версией
                duplicatesMap.entries().forEach(([name, versions]) => {
                    if (versions.size > 1) {
                        console.log(`${name}: ${Array.from(versions).join(' ')}`);
                    }
                })
            }
        }

        return {commands: [DuplicatesCommand]}
    },
};
