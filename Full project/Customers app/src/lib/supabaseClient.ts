import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bbiihjttrtvmyfxrbbwr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiaWloanR0cnR2bXlmeHJiYndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjA5NjQsImV4cCI6MjA2NDY5Njk2NH0.o04SBHpwGN2cHXT2RIWxs-6xvFVd-jDFeAOZ7vUaPAo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 