document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const wordCountSpan = document.getElementById('word-count');
    const slots = document.querySelectorAll('.slot'); 
    const concernTextarea = document.getElementById('concern');
    const timeSlotSpan = document.getElementById('time-slot');
    
    let selectedTimeSlot = '';  
  
    
    slots.forEach(slot => {
      slot.addEventListener('click', () => {
        
        slots.forEach(s => s.classList.remove('selected'));
        
        slot.classList.add('selected');
        selectedTimeSlot = slot.getAttribute('data-time'); 
        timeSlotSpan.textContent = `Selected time: ${selectedTimeSlot}`; 
      });
    });
  
  
    concernTextarea.addEventListener('input', () => {
      const wordCount = concernTextarea.value.split(/\s+/).filter(Boolean).length;
      wordCountSpan.textContent = wordCount;
    });
  
    
    const urlParams = new URLSearchParams(window.location.search);
    const therapistName = urlParams.get('therapist');
    document.getElementById('therapist').value = therapistName;
  
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); 
  
      const concern = concernTextarea.value;
      const date = document.getElementById('date').value;
      const mode = document.querySelector('input[name="mode"]:checked')?.value;
      const therapist = document.getElementById('therapist').value;
  
      
      if (!concern || !date || !selectedTimeSlot || !mode) {
        alert('Please fill all the required fields');
        return;
      }
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      
      try {
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            concern,
            date,
            timeSlot: selectedTimeSlot,
            mode,
            therapist,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Booking Confirmed!');
          form.reset(); 
          window.location.href = '/Frontend/3.Therapist Page/Bookedsession.html'; 
        } else {
          
          console.error('Backend response error:', data);
          alert(data.message || 'An error occurred during booking.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit booking. Please check the console for details.');
      }
    });
  });
  