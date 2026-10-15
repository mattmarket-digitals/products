
"use strict";


// Informations de ton projet Supabase.
const SUPABASE_URL = "https://cpktnkjahurhvhabwnsf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_35ldm5ZYB_BfoRGY3-HD6w_boZWqFT9";

// La bibliothèque Supabase est chargée par ajFerme.html.
if (!window.supabase) {
    throw new Error("La bibliothèque Supabase n'est pas chargée.");
}

window.clientSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
