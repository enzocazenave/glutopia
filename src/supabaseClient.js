import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://cpwfabtclvnmzdpkqskj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwd2ZhYnRjbHZubXpkcGtxc2tqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzI4NTA3MSwiZXhwIjoyMDI4ODYxMDcxfQ.qfGVuA2cQj597wsvgqZ6n9ExKkV3hm7NlBq9WpsqK6c'

export default createClient(supabaseUrl, supabaseKey)