const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;

class ROTELCardServices extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _apps: {},
    };
  }

  //static async getConfigElement() {
  //  await import("./rotel-card-editor.js");
  //  return document.createElement("rotel-card-editor");
  //}

  static getStubConfig() {
    return {};
  }

  getCardSize() {
    return 7;
  }

  setConfig(config) {
    if (!config.entity) {
      console.log("Invalid configuration");
      return;
    }

    this._config = { theme: "default", ...config };
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];
    return html`
      ${this.renderStyle()}
      <ha-card .header="${this._config.name}">
        <div class="row">
          </div>
          ${
            this._config.receiver ||
            this._config.invisible ||
            this._config.power
              ? html`
                  <div class="row">
                    <ha-icon-button
                      .action="${"power-off"}"
                      @click="${this.handleActionClick}"
                      title="Power Off"
                      ><ha-icon icon="mdi:power"></ha-icon
                    ></ha-icon-button>
                    <ha-icon-button
                      .action="${"sinput-tv"}"
                      @click="${this.handleActionClick}"
                      title="Select input TV"
                      ><ha-icon icon="mdi:television"></ha-icon
                    ></ha-icon-button>
                    <ha-icon-button
                      .action="${"power"}"
                      @click="${this.handleActionClick}"
                      title="Power"
                      ><ha-icon icon="mdi:power"></ha-icon
                    ></ha-icon-button>
                  </div>
                `
              : ""
          }

          <div class="row">
            <ha-icon-button
              .action="${"sinput-bluray"}"
              @click="${this.handleActionClick}"
              title="Select input CD"
            ><ha-icon icon="mdi:alpha-b-box-outline"></ha-icon></ha-icon-button>
            <ha-icon-button
              .action="${"sinput-phono"}"
              @click="${this.handleActionClick}"
              title="Select input phono"
            ><ha-icon icon="mdi:album"></ha-icon></ha-icon-button>
            <ha-icon-button
              .action="${"sinput-cd"}"
              @click="${this.handleActionClick}"
              title="Select input CD"
            ><ha-icon icon="mdi:disc-player"></ha-icon></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"up"}"
              @click="${this.handleActionClick}"
              title="Up"
            ><ha-icon icon="mdi:chevron-up"></ha-icon></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"left"}"
              @click="${this.handleActionClick}"
              title="Left"
            ><ha-icon icon="mdi:chevron-left"></ha-icon></ha-icon-button>
            <ha-icon-button
              .action="${"select"}"
              @click="${this.handleActionClick}"
              title="Select"
              ><ha-icon icon="mdi:checkbox-blank-circle"></ha-icon></ha-icon-button>
            <ha-icon-button
              .action="${"right"}"
              @click="${this.handleActionClick}"
              title="Right"
            ><ha-icon icon="mdi:chevron-right"></ha-icon></ha-icon-button>
          </div>

          <div class="row">
            <ha-icon-button
              .action="${"down"}"
              @click="${this.handleActionClick}"
              title="Down"
            ><ha-icon icon="mdi:chevron-down"></ha-icon></ha-icon-button>
          </div>

          ${
            this._config.receiver &&
            (this._config.volume_up ||
              this._config.volume_down ||
              this._config.volume_mute)
              ? html`
                  <div class="row">
                    <ha-icon-button
                      .action="${"volume_mute"}"
                      @click="${this.handleActionClick}"
                      title="Volume Mute"
                      ><ha-icon icon="mdi:volume-mute"></ha-icon
                    ></ha-icon-button>
                    <ha-icon-button
                      .action="${"volume_down"}"
                      @click="${this.handleActionClick}"
                      title="Volume Down"
                      ><ha-icon icon="mdi:volume-minus"></ha-icon
                    ></ha-icon-button>
                    <ha-icon-button
                      .action="${"volume_up"}"
                      @click="${this.handleActionClick}"
                      title="Volume Up"
                      ><ha-icon icon="mdi:volume-plus"></ha-icon
                    ></ha-icon-button>
                  </div>
                `
              : ""
          }
        </div>
      </ha-card>
    `;
  }

  updated(changedProps) {
    if (!this._config) {
      return;
    }

    const oldHass = changedProps.get("hass");
    if (!oldHass || oldHass.themes !== this.hass.themes) {
      this.applyThemesOnElement(this, this.hass.themes, this._config.theme);
    }
  }

  renderStyle() {
    return html`
      <style>
        .remote {
          padding: 16px 0px 16px 0px;
        }
        img,
        paper-icon-button {
          width: 64px;
          height: 64px;
          cursor: pointer;
          --mdc-icon-size: 100%;
        }
        .row {
          display: flex;
          padding: 8px 36px 8px 36px;
          justify-content: space-evenly;
        }
        .diagonal {
          background-color: var(--light-primary-color);
        }
      </style>
    `;
  }

  launchApp(e) {
    this.hass.callService("media_player", "select_source", {
      entity_id: this._config.entity,
      source: e.currentTarget.value,
    });
  }

  handleActionClick(e) {
    const custom_services = [
      "power",
      "volume_up",
      "volume_down",
      "volume_mute",
      "up",
      "left",
      "select",
      "right",
      "down",
      "power-off",
      "sinput-tv",
      "sinput-bluray",
      "sinput-phono",
      "sinput-cd",
    ];

    if (
      custom_services.indexOf(e.currentTarget.action) >= 0 &&
      this._config[e.currentTarget.action]
    ) {
      const [domain, service] = this._config[
        e.currentTarget.action
      ].service.split(".", 2);
      this.hass.callService(
        domain,
        service,
        this._config[e.currentTarget.action].service_data
          ? this._config[e.currentTarget.action].service_data
          : null
      );
    } else {
      const [domain, service] = this._config[
        e.currentTarget.action
      ].service.split(".", 2);
      this.hass.callService(
        domain,
        service,
        this._config[e.currentTarget.action].service_data
          ? this._config[e.currentTarget.action].service_data
          : null
      );
    }
  }

  applyThemesOnElement(element, themes, localTheme) {
    if (!element._themes) {
      element._themes = {};
    }
    let themeName = themes.default_theme;
    if (localTheme === "default" || (localTheme && themes.themes[localTheme])) {
      themeName = localTheme;
    }
    const styles = Object.assign({}, element._themes);
    if (themeName !== "default") {
      var theme = themes.themes[themeName];
      Object.keys(theme).forEach((key) => {
        var prefixedKey = "--" + key;
        element._themes[prefixedKey] = "";
        styles[prefixedKey] = theme[key];
      });
    }
    if (element.updateStyles) {
      element.updateStyles(styles);
    } else if (window.ShadyCSS) {
      // implement updateStyles() method of Polemer elements
      window.ShadyCSS.styleSubtree(
        /** @type {!HTMLElement} */ (element),
        styles
      );
    }

    const meta = document.querySelector("meta[name=theme-color]");
    if (meta) {
      if (!meta.hasAttribute("default-content")) {
        meta.setAttribute("default-content", meta.getAttribute("content"));
      }
      const themeColor =
        styles["--primary-color"] || meta.getAttribute("default-content");
      meta.setAttribute("content", themeColor);
    }
  }
}

customElements.define("rotel-card", ROTELCardServices);
