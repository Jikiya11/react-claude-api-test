export const generateRehabPlan = async (age, sport, injury, notes) => {
  try {
    const response = await fetch('http://localhost:3001/api/generate-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age, sport, injury, notes }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.plan;
  } catch (error) {
    console.error('Error calling backend:', error);
    throw error;
  }
};