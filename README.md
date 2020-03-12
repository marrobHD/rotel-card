# Rotel Remote Card
🔊 [Rotel Lovelace Card](https://github.com/custom-cards/roku-card) editited by mar_robHD

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)
[![Discord][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

[![Twitter][twitter]][twitter]
[![Github][github]][github]

## Support

This card is for [Lovelace](https://www.home-assistant.io/lovelace) on [Home Assistant](https://www.home-assistant.io/) that display a [Rotel](http://www.rotel.com/de/home-theater) remote.

# NOTE: Firefox releases before 67 are not supported
https://twitter.com/_developit/status/1090364879377260544

![ex](https://i.imgur.com/ff9GHRC.png)

## Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:firetv-card`
| entity | string | **Required** | `media_player` entity of Roku device
| remote | string | **Optional** | `remote` entity of Roku device. Default assume named like `entity`
| name | string | **Optional** | Card name
| theme | string | **Optional** | Card theme
| tv | boolean | **Optional** | If `true` shows volume and power buttons. Default `false`
| power | `service` | **Optional**| service to call when power button pressed
| power-off | `service` | **Optional**| service to call when power-off button pressed
| sinput-tv | `service` | **Optional**| service to call when home button pressed
| up | `service` | **Optional**| service to call when up button pressed
| left | `service` | **Optional**| service to call when left button pressed
| select | `service` | **Optional**| service to call when select button pressed
| right | `service` | **Optional**| service to call when right button pressed
| down | `service` | **Optional**| service to call when down button pressed
| sinput-bluray | `service` | **Optional**| service to call when bluray button pressed
| sinput-phono | `service` | **Optional**| service to call when phono button pressed
| sinput-cd | `service` | **Optional**| service to call when cd button pressed
| volume_up | `service` | **Optional**| service to call when volume up button pressed
| volume_down | `service` | **Optional**| service to call when volume down button pressed
| volume_mute | `service` | **Optional**| service to call when volume mute button pressed


## `service` Options
| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| service | string | **Required** | Service to call
| service_data | string | **Optional** | Service data to use


## Installation

### HACS:

1.

Add this to your `HACS settings tab`:

```
https://github.com/marrobHD/rotel-card
```
![example](https://i.imgur.com/2urg4m2.png)

### Step 1

Install `rotel-card` by copying `rotel-card.js` and `rotel-card-editor.js` from this repo to `<config directory>/www/rotel-card.js` on your Home Assistant instance.

**Example:**

```bash
wget https://raw.githubusercontent.com/marrobHD/rotel-card/master/rotel-card.js
wget https://raw.githubusercontent.com/marrobHD/rotel-card/master/rotel-card-editor.js
mv rotel-card* /config/www/
```

### Step 2

Link `rotel-card` inside your `ui-lovelace.yaml`.

```yaml
resources:
  - type: module
    url: /local/rotel-card.js?v=1
```

### Step 3

Add a custom element in your `ui-lovelace.yaml`

Configuration for [Rotel RSX-1562](http://www.rotel.com/sites/default/files/product/rsx1562_silver.jpg):

```yaml
        type: 'custom:rotel-card'
        theme: Backend-selected
        tv: false
        name: Rotel
        remote: input_select.tv_input
        power:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
                  JgBQAAABJZUQORI3ExIRFQ8VEBQRFRE3ERURExAWDxUROBAUEhMRFBAUERUQFQ86EDkQFREUEDgROhA6EDkQFBAVEDkRORAUEgAFuQABJ0oQAA0FAAAAAAAAAAA=
        power-off:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBQAAABJpUROBI3EhMSExAVERMRFBI3ExIRFBEUERMSOBETERUQFRETERMRFBITERQRExEUETgRORE4EjgSNxQ2ETgSNxEUEQAFuQABJksSAA0FAAAAAAAAAAA=
        sinput-tv:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZUSOBM2ERQSExAVERMQFRE5EBQSEhEUEhMSNxEUERQSExE4ERQSEhI4ERMSFBAUERQRExI4EzYRFBI3EjgRORA5EgANBQ==
        sinput-phono:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABKZERORE4ERQRExUQERQVEBE4FBERExUQFRAROBITFRARExQRFRARFBE4FRAUEBITERQROBE5FDUVEBE4EjgROBU0FQANBQ==
        sinput-cd:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZUROBI4ERMVEBQRERMSExI4FBASExEUERQUNREUFBASExU1FBASExEUERMSExUQERQRExQ2ETgUNhE4FDYROBE4FQANBQ==
        sinput-bluray:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABKZEWNBE4ERQWDxETEhMWDxE4ERQVEBQQEhMVNRUPERQWDxE4FjQROBEUERMSExUQERQUEBUQERQWMxU1ETgROBU1EgANBQ==
        down:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJpQRORE4ERQRExITERQRFBE4ERQROBITERQROBE4EhMRFBEUERMSExE4EjgRFBE4ERQROBE5ETgRFBETEjgRFBE4EQANBQ==
        left:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZUROBI4ERMSExEUERQRExI4ERQROBEUERMSOBE4ERQRFBETEhMSNxI4ETgSExEUERMSOBE4EhQRExETEjgROBI4EQANBQ==
        right:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZURORE4ERQRFBAUERQRFBE4ERQROBITERQROBE5ERMSExE4EhMROBI3EhQRFBE4ERQRExI4ERQRExE5ETgRFBE4EQANBQ==
        select:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZURORE4ERQRFBAUERQRFBE4ERQROBITERQROBE5ERMSExEUETgRORE4ETgSExEUERQROBEUERQRExEUETgSOBE4EQANBQ==
        up:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZURORE4ERQRFBAUERQRFBE4ERQROBEUERQROBE5ERMSExE4EjgROBITETgSExE5ERMSExEUERMSOBETEjgRFBE4EQANBQ==
        volume_down:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJpQSOBE4EhMRFBAUEhMRFBE4EhMRFBETEhMROBITERQRFBE4ETgTNxEUETgRFBEUERMSExEUERMSOBEUETgROBI4EQANBQ==
        volume_mute:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJZUSNxI4ERMSExEUERQRExI4ERQRExEUERQROBEUEhMRExITERQRExI4ETgSExITERQROBE4EjgRFBETEjgROBE5EQANBQ==
        volume_up:
          service: broadlink.send
          service_data:
            host: 192.168.178.73
            packet: >-
              JgBIAAABJpQSOBE4EhMRFBETEhMRFBE4EhMSExETEhMRORETERQRFBEUETgROBEUETkRExITERQROBEUERQROBEUETgROBI4EQANBQ==
```

**Custom Updater:**

Add this to your `configuration.yaml`

```
custom_updater:
  card_urls:
    - https://raw.githubusercontent.com/marrobHD/rotel-card/master/tracker.json
```


[Troubleshooting](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

[commits-shield]: https://img.shields.io/github/commit-activity/y/marrobHD/rotel-card.svg?style=for-the-badge
[commits]: https://github.com/marrobHD/rotel-card/commits/master
[discord]: https://discord.gg/ND4emRS
[discord-shield]: https://img.shields.io/discord/579704220970909717.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/lovelace-rotel-remote-card/91476
[license-shield]: https://img.shields.io/github/license/marrobHD/rotel-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-marrobHD-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/marrobHD/rotel-card.svg?style=for-the-badge
[releases]: https://github.com/marrobHD/rotel-card/releases
[twitter]: https://img.shields.io/twitter/follow/mar_robHD.svg?style=social
[github]: https://img.shields.io/github/followers/marrobHD.svg?style=social
