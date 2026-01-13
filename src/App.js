import './App.css';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { generateRehabPlan } from './api/claude';

function App() {

  const [age, setAge] = useState();
  const [sport, setSport] = useState();
  const [injury, setInjury] = useState("");
  const [notes, setAgeNotes] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!age || !sport || !injury) {
      setError("Fill shit out");
      return;
    }

    setLoading(true);
    setError("");
    setPlan("");

    try {
      const rehabPlan = await generateRehabPlan(age, sport, injury, notes);
      setPlan(rehabPlan);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Box component="form"
           sx={{m: 2, display: 'flex', flexDirection: 'column', gap: 2, width: 400}}>
          <TextField variant="outlined" label="Age" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
          <TextField variant="outlined" label="Sport" id="sport" value={sport} onChange={(e) => setSport(e.target.value)} />
          <TextField variant="outlined" label="Injury" id="injury" value={injury} onChange={(e) => setInjury(e.target.value)} />
          <TextField variant="outlined" label="Notes" id="notes" value={notes} onChange={(e) => setAgeNotes(e.target.value)} />
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Generate Plan'}</Button>
          {error && (
          <Box sx={{ color: 'error.main', fontSize: '0.875rem' }}>
            {error}
          </Box>
        )}
        <TextField variant="outlined" label="Plan" id="plan" value={plan} multiline rows={10} slotProps={{input: { readOnly: true }}}/>
      </Box>
    </div>
  );
}

export default App;
