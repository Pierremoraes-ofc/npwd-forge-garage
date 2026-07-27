import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';
import DirectionsBoatRoundedIcon from '@mui/icons-material/DirectionsBoatRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import { fetchNui } from './utils/fetchNui';
import type { GarageVehicle, NuiResponse, VehicleType } from './types';

const ACCENT = '#ff6b00';

const typeIcon: Record<VehicleType, React.ReactNode> = {
  car: <DirectionsCarRoundedIcon />,
  bike: <TwoWheelerRoundedIcon />,
  boat: <DirectionsBoatRoundedIcon />,
  aircraft: <FlightRoundedIcon />,
};

const stateColor: Record<string, string> = {
  out: '#f59e0b',
  garaged: '#22c55e',
  insurance: '#ef4444',
  impounded: '#ef4444',
  unknown: '#737373',
};

const clamp = (value: number) => Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));

function Meter({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  const safe = clamp(value);
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
        {icon}
        <Typography variant="caption" color="text.secondary">{label} {Math.round(safe)}%</Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={safe}
        sx={{ height: 5, borderRadius: 4, bgcolor: 'rgba(127,127,127,.18)', '& .MuiLinearProgress-bar': { bgcolor: ACCENT } }}
      />
    </Box>
  );
}

function VehicleCard({ vehicle, dark }: { vehicle: GarageVehicle; dark: boolean }) {
  const [tracking, setTracking] = useState(false);

  const track = async () => {
    setTracking(true);
    try {
      await fetchNui<NuiResponse>('npwd:forge-garage:requestWaypoint', {
        plate: vehicle.plate,
        garage: vehicle.garage,
      });
    } finally {
      setTracking(false);
    }
  };

  return (
    <Box sx={{
      p: 1.5,
      borderRadius: 2.5,
      border: '1px solid rgba(255,107,0,.22)',
      bgcolor: dark ? 'rgba(28,28,28,.94)' : 'rgba(255,255,255,.96)',
      boxShadow: '0 8px 24px rgba(0,0,0,.16)',
    }}>
      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box sx={{ width: 42, height: 42, flex: '0 0 auto', borderRadius: 2, display: 'grid', placeItems: 'center', color: ACCENT, bgcolor: 'rgba(255,107,0,.12)' }}>
          {typeIcon[vehicle.type]}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontWeight={800} noWrap>{vehicle.fullname || vehicle.model || vehicle.spawnName}</Typography>
          <Typography variant="caption" color="text.secondary">Placa: {vehicle.plate}</Typography>
        </Box>
        <Chip
          size="small"
          label={vehicle.state || 'Desconhecido'}
          sx={{ color: stateColor[vehicle.stateCode] || stateColor.unknown, bgcolor: `${stateColor[vehicle.stateCode] || stateColor.unknown}18`, fontWeight: 700, maxWidth: 105 }}
        />
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center" mt={1.25} mb={1.4}>
        <LocationOnRoundedIcon sx={{ color: ACCENT, fontSize: 18 }} />
        <Typography variant="body2" color="text.secondary" noWrap>{vehicle.garage || 'Fora da garagem'}</Typography>
      </Stack>

      <Stack direction="row" spacing={1.2} mb={1.5}>
        <Meter icon={<LocalGasStationRoundedIcon sx={{ fontSize: 14 }} />} label="Combustível" value={vehicle.fuel} />
        <Meter icon={<BuildRoundedIcon sx={{ fontSize: 14 }} />} label="Motor" value={(vehicle.engine || 0) / 10} />
      </Stack>

      <Button
        fullWidth
        size="small"
        variant="outlined"
        disabled={vehicle.disableTracking || tracking}
        onClick={track}
        startIcon={tracking ? <CircularProgress size={14} /> : <LocationOnRoundedIcon />}
        sx={{ color: ACCENT, borderColor: 'rgba(255,107,0,.55)', '&:hover': { borderColor: ACCENT, bgcolor: 'rgba(255,107,0,.08)' } }}
      >
        {vehicle.disableTracking ? 'Rastreamento indisponível' : 'Marcar no mapa'}
      </Button>
    </Box>
  );
}

export default function App({ theme }: { theme: { palette?: { mode?: string } } }) {
  const history = useHistory();
  const dark = theme?.palette?.mode === 'dark';
  const [vehicles, setVehicles] = useState<GarageVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<VehicleType | 'all'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchNui<NuiResponse<GarageVehicle[]>>('npwd:forge-garage:getVehicles');
      if (response.status !== 'ok') throw new Error(response.message || 'Falha ao carregar veículos.');
      setVehicles(Array.isArray(response.data) ? response.data : []);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Falha ao carregar veículos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const visible = useMemo(
    () => filter === 'all' ? vehicles : vehicles.filter((vehicle) => vehicle.type === filter),
    [filter, vehicles],
  );

  return (
    <Box sx={{ height: '100%', overflow: 'auto', boxSizing: 'border-box', p: 2, color: dark ? '#fff' : '#171717', bgcolor: dark ? '#111' : '#f5f5f5' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <IconButton onClick={() => history.goBack()}><ArrowBackRoundedIcon /></IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography fontSize={21} fontWeight={900}>Forge Garage</Typography>
          <Typography variant="caption" color="text.secondary">{vehicles.length} veículo(s)</Typography>
        </Box>
        <IconButton onClick={() => void load()} disabled={loading}><RefreshRoundedIcon /></IconButton>
      </Stack>

      <Stack direction="row" spacing={0.7} sx={{ overflowX: 'auto', pb: 1.2 }}>
        {(['all', 'car', 'bike', 'boat', 'aircraft'] as const).map((value) => (
          <Chip
            key={value}
            size="small"
            label={{ all: 'Todos', car: 'Carros', bike: 'Motos', boat: 'Barcos', aircraft: 'Aeronaves' }[value]}
            onClick={() => setFilter(value)}
            sx={filter === value ? { bgcolor: ACCENT, color: '#fff', fontWeight: 800 } : undefined}
          />
        ))}
      </Stack>

      {loading && <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}><CircularProgress sx={{ color: ACCENT }} /></Box>}
      {!loading && error && <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => void load()}>Tentar novamente</Button>}>{error}</Alert>}
      {!loading && !error && visible.length === 0 && <Alert severity="info">Nenhum veículo encontrado neste filtro.</Alert>}
      {!loading && !error && <Stack spacing={1.2}>{visible.map((vehicle) => <VehicleCard key={vehicle.plate} vehicle={vehicle} dark={dark} />)}</Stack>}
    </Box>
  );
}