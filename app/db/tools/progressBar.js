const cliProgress = require("cli-progress");

class ProgressBar {
  constructor() {
    this.progressBar = null;
    this.currentValue = 0;
    this.increaseValue = 0;
  }

  start(totalValue, increaseValue, _header = "") {
    const header = _header === "" ? "" : `${_header} `;
    this.progressBar = new cliProgress.SingleBar(
      {
        format: `${header}[{bar}] {percentage}% | ETA: {eta}s`,
        hideCursor: true,
      },
      cliProgress.Presets.shades_classic
    );
    this.increaseValue = increaseValue;
    this.progressBar.start(totalValue, 0);
  }

  update() {
    this.currentValue += this.increaseValue;
    this.progressBar.update(this.currentValue);
  }

  end() {
    this.progressBar.stop();
    this.progressBar = null;
  }
}

module.exports = { ProgressBar };
