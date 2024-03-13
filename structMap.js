const fs = require('fs');
const path = require('path');
const gitRepoName = require('git-repo-name');

function isIgnoredItem(itemName) {
    // Lista de itens a serem ignorados na estrutura
    const ignoredItems = ['.vs','node_modules', 'results', '.git', '.gitignore'];
    return ignoredItems.includes(itemName.toLowerCase());
}

function readRootItems(basePath, indent = 0) {
    const contents = fs.readdirSync(basePath);
    const result = [];
    const cenariosResult = [];
    const cypressResult = [];
    const otherItemsResult = [];

    contents.forEach(item => {
        const itemPath = path.join(basePath, item);
        const itemName = item === 'package.json' ? 'package.json' : item.toLowerCase();
        const isDirectory = fs.statSync(itemPath).isDirectory();
        const isFile = fs.statSync(itemPath).isFile();

        if (!isIgnoredItem(item)) {
            if (isDirectory) {
                if (itemName.toLowerCase() === 'cypress') {
                    cypressResult.push(`${'│   '.repeat(indent)}├── ${itemName}/`);
                    cypressResult.push(...readRootItems(path.join(basePath, item), indent + 1));
                } else if (itemName.toLowerCase() === 'cenarios') {
                    cenariosResult.push(`${'│   '.repeat(indent)}├── ${itemName}/`);
                    cenariosResult.push(...readRootItems(path.join(basePath, item), indent + 1));
                } else if (itemName.toLowerCase() === 'e2e') {
                    cenariosResult.push(`${'│   '.repeat(indent)}├── ${itemName}/`);
                    cenariosResult.push(...readRootItems(path.join(basePath, item), indent + 1));
                } else {
                    otherItemsResult.push(`${'│   '.repeat(indent)}├── ${itemName}/`);
                }
            } else if (isFile) {
                otherItemsResult.push(`${'│   '.repeat(indent)}├── ${itemName}`);
            }
        }
    });

    // Adiciona a estrutura de cenários antes da estrutura Cypress
    if (cenariosResult.length > 0) {
        result.push(...cenariosResult);
    }

    // Adiciona a estrutura Cypress
    if (cypressResult.length > 0) {
        result.push(...cypressResult);
    }

    // Adiciona os demais itens da estrutura
    if (otherItemsResult.length > 0) {
        result.push(...otherItemsResult);
    }

    return result;
}

// Função para obter o nome do repositório usando git-repo-name
function getRepoName() {
    try {
        const repoName = gitRepoName.sync();
        return repoName;
    } catch (error) {
        console.error('Erro ao obter o nome do repositório:', error.message);
        return null;
    }
}

// Caminho do projeto (pode ser qualquer caminho de projeto no qual você deseja executar o script)
const projectPath = path.join(__dirname, '../', getRepoName() || ''); 

if (projectPath) {
    const result = readRootItems(projectPath);
    console.log('├── Estrutura do projeto');
    console.log(result.join('\n'));
} else {
    console.error('Não foi possível obter o caminho do projeto.');
}