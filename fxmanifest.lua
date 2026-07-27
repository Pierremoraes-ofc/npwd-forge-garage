fx_version 'cerulean'
game 'gta5'

name 'npwd-forge-garage'
description 'Forge Garage application and notifications for NPWD'
author 'ForgeBox'
version '1.0.0'

shared_script '@pr_bridge/init.lua'

client_script 'client/main.lua'
server_script 'server/main.lua'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/**/*',
}

dependencies {
    'pr_bridge',
    'forge-garage',
}

lua54 'yes'