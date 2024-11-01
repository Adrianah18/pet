// src/app/components/Cabecallho.js
'use client'
import React from 'react';

export default function Cabecalho({ titulo, subtitulo }) {
  return (
    <div>
      <h2>{titulo}</h2>
      <p>{subtitulo}</p>
    </div>
  );
}
