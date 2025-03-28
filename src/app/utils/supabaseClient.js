// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llzardxjsqypkkslhrbr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsemFyZHhqc3F5cGtrc2xocmJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NjI4MjcsImV4cCI6MjA0NzUzODgyN30.HjLHbeDu9IbriOH2-7vW0b-WblpVQjWjABcudG-93KU'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase