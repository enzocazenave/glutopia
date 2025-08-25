import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://wxrxmtxxdnarwbifdfsr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cnhtdHh4ZG5hcndiaWZkZnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzczMTQsImV4cCI6MjA3MTY1MzMxNH0.LK6J8SkpAVizmi-INjiWRtaIsAbmpD15so5_sY_5fkc'

export default createClient(supabaseUrl, supabaseKey)