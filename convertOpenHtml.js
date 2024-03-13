const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');
const { exec } = require('child_process');
const moment = require('moment-timezone');

function parseXml(xmlContent) {
  const parser = new DOMParser();
  return parser.parseFromString(xmlContent, 'application/xml');
}

// Função para obter o nome do projeto a partir do package.json
function getProjectName() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.name || 'Nome do Projeto';
  } catch (error) {
    console.error(`Error reading package.json: ${error.message}`);
    return 'Nome do Projeto';
  }
}

function getStatusStyle(status) {
  if (status === 'Passed') {
    return 'color: green; font-weight: bold;';
  } else {
    return 'color: red; font-weight: bold;';
  }
}

function getDurationStyle(duration) {
  if (parseFloat(duration) > 2.0) {
    return 'color: red; font-weight: bold;';
  } else if (parseFloat(duration) < 2.0) {
    return 'color: green; font-weight: bold;';
  } else {
    return 'color: yellow; font-weight: bold;';
  }
}

function getNavigationButtons(currentFile, htmlFiles) {
  const currentIndex = htmlFiles.indexOf(currentFile);
  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  const prevButton = prevIndex >= 0
    ? `<a href="${htmlFiles[prevIndex]}">Anterior</a>`
    : '';

  const nextButton = nextIndex < htmlFiles.length
    ? `<a href="${htmlFiles[nextIndex]}">Próximo</a>`
    : '';

  return `
    ${prevButton}
    ${nextButton}
  `;
}


function generateHtml(xmlDoc, currentFile, htmlFiles, darkMode, projectName) {
  const testSuites = xmlDoc.getElementsByTagName('testsuite');
  const totalTests = xmlDoc.documentElement.getAttribute('tests');
  const totalTime = xmlDoc.documentElement.getAttribute('time');
  const totalfailures = xmlDoc.documentElement.getAttribute('failures');

  const tableRows = Array.from(testSuites).map(currentSuite => {
    const testCases = currentSuite.getElementsByTagName('testcase');

    const suiteName = currentSuite.getAttribute('name');
    const suiteTime = currentSuite.getAttribute('time');
    const suiteTests = currentSuite.getAttribute('tests');

    const suiteRows = Array.from(testCases).map(currentTestCase => {
      const status = currentTestCase.getElementsByTagName('failure').length > 0 ? 'Failed' : 'Passed';
      const duration = parseFloat(currentTestCase.getAttribute('time'));

      let statusStyle = '';
      let durationStyle = '';

      // Definindo estilos para a coluna Status
      if (status === 'Passed') {
        statusStyle = 'color: green; font-weight: bold;';
      } else {
        statusStyle = 'color: red; font-weight: bold;';
      }

      // Definindo estilos para a coluna Duration
      if (duration > 2.0) {
        durationStyle = 'color: red; font-weight: bold;';
      } else if (duration < 2.0) {
        durationStyle = 'color: green; font-weight: bold;';
      } else {
        durationStyle = 'color: yellow; font-weight: bold;';
      }

      return `
        <tr>
          <td>${currentTestCase.getAttribute('name')}</td>
          <td style="${statusStyle}">${status}</td>
          <td style="${durationStyle}">${currentTestCase.getAttribute('time')}</td>
        </tr>
      `;
    }).join('');

    return `
      <tr>
        <td colspan="3" style="font-weight: bold;">${suiteName} - ${suiteTests} tests em ${suiteTime} segundos</td>
      </tr>
      ${suiteRows}
    `;
  }).join('');

  const themeSwitchButton = `
    <button onclick="toggleTheme()" class="theme-switch-button" style="position: absolute; top: 10px; right: 10px;">
      ${darkMode ? '<i class="material-icons moon-icon">wb_sunny</i>' : '<i class="material-icons sun-icon">nights_stay</i>'}
    </button>
  `;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Report - ${projectName}</title>
      <link rel="stylesheet" href="../styles.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <script>
        // Script para alternar o tema claro/escuro
        function toggleTheme() {
          const body = document.body;
          const icon = document.querySelector('.material-icons');

          if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            icon.textContent = 'wb_sunny';
            localStorage.setItem('darkMode', 'false'); // Armazenar o estado no localStorage
          } else {
            body.classList.add('dark-mode');
            icon.textContent = 'nights_stay';
            localStorage.setItem('darkMode', 'true'); // Armazenar o estado no localStorage
          }
        }

        // Função para carregar o modo armazenado no localStorage
        function loadStoredTheme() {
          const storedMode = localStorage.getItem('darkMode');
          const body = document.body;
          const icon = document.querySelector('.material-icons');

          if (storedMode === 'true') {
            body.classList.add('dark-mode');
            icon.textContent = 'nights_stay';
          } else {
            body.classList.remove('dark-mode');
            icon.textContent = 'wb_sunny';
          }
        }

        // Chamar a função ao carregar a página
        window.onload = loadStoredTheme;
      </script>
    </head>
    <body class="${darkMode ? 'dark-mode' : ''}">
    <div id="logo">
    <img src="../cypress/fixtures/logo.png" alt="Logo">
  </div>
      <h1>Test Report - ${projectName}</h1>
      <p colspan="3" style="font-weight: bold;">
      Total Tests: ${totalTests} Total Time: ${totalTime} seconds Total Erros: ${totalfailures}
      </p>
         <table>
        <tr>
          <th>Test Case</th>
          <th>Status</th>
          <th>Duration</th>
        </tr>
        ${tableRows}
      </table>
      <div id="navigation">
      ${getNavigationButtons(currentFile, htmlFiles)}
    </div>
    ${themeSwitchButton}
  </body>
  </html>
  `;
}

function createHtml(xmlPath, darkMode) {
  const xmlContent = fs.readFileSync(xmlPath, 'utf-8');
  const xmlDoc = parseXml(xmlContent);

  const htmlFiles = fs.readdirSync(path.dirname(xmlPath)).filter(file => file.endsWith('.html'));
  const currentFile = path.basename(xmlPath, '.xml') + '.html';

  const projectName = getProjectName(); // Adicionando essa linha para obter o nome do projeto
  const htmlContent = generateHtml(xmlDoc, currentFile, htmlFiles, darkMode, projectName);

  const htmlFileName = currentFile;
  const htmlFilePath = path.join(path.dirname(xmlPath), htmlFileName);

  fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');

  console.log(`HTML file created: ${htmlFilePath}`);

  return htmlFilePath;
}

function convertXmlFolder(folderPath, darkMode) {
  const xmlFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.xml'));

  xmlFiles.forEach(xmlFile => {
    const xmlPath = path.join(folderPath, xmlFile);
    createHtml(xmlPath, darkMode);
  });
}

function openHtmlFolder(folderPath) {
  const htmlFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.html'));

  htmlFiles.forEach(htmlFile => {
    const htmlPath = path.join(folderPath, htmlFile);

    try {
      // Abre o arquivo HTML no navegador padrão usando o comando
      exec(`start "" "${htmlPath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error opening HTML file: ${stderr}`);
        } else {
          console.log(`HTML file opened: ${htmlPath}`);
        }
      });
    } catch (error) {
      console.error(`Error opening HTML file: ${error.message}`);
    }
  });
}

// Verifica se o script está sendo executado como o principal
if (require.main === module) {
  // Usage: node convertOpenHtml.js path/to/xml/folder darkMode
  const xmlFolderPath = process.argv[2];
  const darkMode = process.argv[3] === 'darkMode';

  if (!xmlFolderPath) {
    console.error('Please provide the path to the XML folder.');
  } else {
    // Convert XML to HTML
    convertXmlFolder(xmlFolderPath, darkMode);
  }
}
