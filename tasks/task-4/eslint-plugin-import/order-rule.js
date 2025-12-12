const rule = {
    meta: {
        type: "problem",
        docs: {
            description: "Sort and group imports",
        },
        schema: [],
        fixable: "code",
    },
    create(context) {
        return {
            Program(node) {
                const importNodes = node.body.filter(
                    (n) => n.type === "ImportDeclaration"
                );

                if (importNodes.length < 2) return;

                // Сохраняем оригинальный список
                const originalImportList = [...importNodes];

                // Формируем отсортированный список
                const sortedImportList = [...importNodes].sort((a, b) => {
                    const groupA = getGroupPriority(a.source.value);
                    const groupB = getGroupPriority(b.source.value);
                    if (groupA !== groupB) {
                        return groupA - groupB;
                    }
                    return a.source.value.localeCompare(b.source.value);
                });

                const isSameOrder = originalImportList.every(
                    (originalImport, i) => originalImport === sortedImportList[i]
                );

                console.log(111, originalImportList
                    .map((imp) => context.getSourceCode().getText(imp))
                    .join("\n")
                )
                console.log(222, sortedImportList
                    .map((imp) => context.getSourceCode().getText(imp))
                    .join("\n")
                )
                console.log(333, isSameOrder)

                if (isSameOrder) return;

                context.report({
                    node: importNodes[0],
                    message: "Imports are not sorted by groups",
                    fix(fixer) {
                        const sourceCode = context.getSourceCode();

                        const text = sortedImportList
                            .map((imp) => sourceCode.getText(imp))
                            .join("\n");

                        return fixer.replaceTextRange(
                            [importNodes[0].range[0], importNodes[importNodes.length - 1].range[1]],
                            text
                        );
                    },
                });
            }
        };
    },
};

function getGroupPriority(source) {
    if (!source.startsWith(".")) return 0;
    if (source.startsWith("./")) return 1;
    if (source.startsWith("../")) return 2;
    return 3;
}

export default rule;