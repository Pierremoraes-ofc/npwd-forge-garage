local function notifyPlayer(source, data)
    source = tonumber(source)
    if not source or source <= 0 or GetPlayerPing(source) <= 0 then
        return false
    end

    TriggerClientEvent('npwd-forge-garage:client:notify', source, data)
    return true
end

exports('notifyPlayer', notifyPlayer)