"use client";
export default function Error({reset}:{error:Error;reset:()=>void}){return <div role="alert" className="p-6 text-danger"><p>Unable to load this screen.</p><button type="button" className="min-h-11 underline" onClick={reset}>Retry</button></div>;}
