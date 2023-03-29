const { shell } = require('electron');
const { Plugin } = require('obsidian');

class OpenDirectoryInVSCode extends Plugin {

  async onload() {
    this.addOpenInVSCodeContextMenu();
  }

  async onunload() {
    this.app.workspace.off('file-menu', this.onContextMenu);
  }

  addOpenInVSCodeContextMenu() {
    this.onContextMenu = (menu, file) => {
      console.log('onContextMenu', menu, file, file.type)
      menu.addItem((item) => {
        item.setTitle('Open in VSCode')
          .setIcon('code')
          .onClick(() => this.openFolderInVSCode(file.path));
      });
    };

    this.app.workspace.on('file-menu', this.onContextMenu);
  }

  openFolderInVSCode(folderPath) {
    const fullPath = this.app.vault.adapter.basePath + '/' + folderPath;
    shell.openExternal(`vscode://file/${encodeURIComponent(fullPath)}`);
  }
}

module.exports = OpenDirectoryInVSCode