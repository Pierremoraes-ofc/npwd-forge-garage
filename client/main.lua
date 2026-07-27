local APP_ID = 'npwd_forge_garage'
local APP_PATH = '/npwd-forge-garage'

local function notify(data)
    data = type(data) == 'table' and data or {}

    if GetResourceState('npwd') ~= 'started' then
        return false
    end

    local notification = {
        notisId = tostring(data.notisId or ('npwd-forge-garage:%s'):format(GetGameTimer())),
        appId = APP_ID,
        title = tostring(data.title or 'Forge Garage'),
        content = tostring(data.content or data.description or 'Atualização da garagem.'),
        keepOpen = data.keepOpen == true,
        duration = tonumber(data.duration) or 5000,
        path = data.path or APP_PATH,
    }

    return pcall(function()
        exports.npwd:createNotification(notification)
    end)
end

local function vehicleType(spawnName)
    if type(spawnName) ~= 'string' or spawnName == '' then
        return 'car'
    end

    local class = GetVehicleClassFromName(joaat(spawnName))

    if class == 15 or class == 16 then
        return 'aircraft'
    elseif class == 14 then
        return 'boat'
    elseif class == 8 or class == 13 then
        return 'bike'
    end

    return 'car'
end

RegisterNUICallback('npwd:forge-garage:getVehicles', function(_, cb)
    if GetResourceState('forge-garage') ~= 'started' then
        cb({ status = 'error', message = 'forge-garage indisponível', data = {} })
        return
    end

    local success, vehicles = pcall(function()
        return exports['forge-garage']:getvehForPhone()
    end)

    if not success or type(vehicles) ~= 'table' then
        cb({ status = 'error', message = 'Não foi possível carregar os veículos.', data = {} })
        return
    end

    for i = 1, #vehicles do
        vehicles[i].type = vehicleType(vehicles[i].spawnName)
    end

    cb({ status = 'ok', data = vehicles })
end)

RegisterNUICallback('npwd:forge-garage:requestWaypoint', function(data, cb)
    local plate = type(data) == 'table' and tostring(data.plate or '') or ''
    local garage = type(data) == 'table' and data.garage or nil

    if plate == '' or GetResourceState('forge-garage') ~= 'started' then
        cb({ status = 'error', message = 'Veículo inválido.' })
        return
    end

    local success, tracked = pcall(function()
        return exports['forge-garage']:trackveh(plate, garage, true)
    end)

    local located = success and tracked == true
    notify({
        notisId = ('npwd-forge-garage:waypoint:%s'):format(plate),
        content = located and ('Localização do veículo %s marcada no mapa.'):format(plate)
            or ('Não foi possível localizar o veículo %s.'):format(plate),
    })

    cb({
        status = located and 'ok' or 'error',
        message = located and 'Localização marcada.' or 'Veículo não localizado.',
    })
end)

RegisterNetEvent('npwd-forge-garage:client:notify', function(data)
    notify(data)
end)

exports('sendGarageNotification', notify)