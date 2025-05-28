import { RealtimeClient } from '@supabase/realtime-js';

export const createRealtimeClient = () => {
  if (typeof window === 'undefined') return null;

  return new RealtimeClient('wss://mocnbrmswtszbwrhiznk.supabase.co/realtime/v1', {
    params: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vY25icm1zd3RzemJ3cmhpem5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTAxMTEsImV4cCI6MjA2MzM4NjExMX0.V3n-mmjs6tVtokfCQSw_dfSFh8eDQX8rQ1ypgqGLqDQ',
    },
    WebSocket: window.WebSocket,
  });
};
