'use babel';

import { CompositeDisposable } from 'atom'
import env from 'node-env-file'
import fs from 'fs'

const loadEnvFile = (filePath) => {
  try {
    var file = fs.openSync(filePath, 'r')
    var stats = fs.fstatSync(file)
    fs.close(file)

    if (!stats.isFile()) {
      atom.notifications.addError('Load .env Variables: dotenv file is not a file', { detail: filePath })

      return false
    }
  } catch (err) {
    // File not found, skip
    return false
  }

  env(filePath)
  atom.notifications.addSuccess('Load .env Variables: file correctly loaded', { detail: filePath })

  return true
}

export default {
  subscriptions: null,
  config: {
    envFile: {
      type: "string",
      title: "Dotenv file name",
      description: "The name of files that must be considered the .env files",
      default: ".env"
    },
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'load-dotenv-variables:reload': () => this.reload()
    }));

    this.subscriptions.add(atom.project.onDidChangePaths(this.reload))

    this.reload()
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  reload() {
    const dotEnvFileName = atom.config.get('load-dotenv-variables.envFile')

    const dotEnvFiles = atom.project.getDirectories().map(dir => {
      return `${dir.getPath()}/${dotEnvFileName}`
    })

    let loaded = false
    dotEnvFiles.forEach(file => {
      loaded = loaded || loadEnvFile(file)
    })

    if (!loaded) {
      atom.notifications.addWarning('Load .env Variables: no dotenv file was loaded', { detail: `Searching for: ${dotEnvFileName}` })
    }
  }
};
