import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setAudioState } from '../../store/slices/registerSlice';

interface AudioPlayerProps {
  audioId: string | undefined;
}

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const { currentAudioIsPlaying, currentAudioUrl } = useSelector((state: RootState) => ({
    currentAudioIsPlaying: state.register.currentAudioIsPlaying,
    currentAudioUrl: state.register.currentAudioUrl,
  }));

  const audioRef = useRef<HTMLAudioElement | null>(null); // useRef é usado para armazenar a instância do HTMLAudioElement e evitar a criação de novas instâncias em cada renderização.

  useEffect(() => {
    // Se houver URL e áudio estiver tocando
    if (currentAudioUrl && currentAudioIsPlaying) {
      if (audioRef.current) {
        // Atualizar o src do áudio
        audioRef.current.src = currentAudioUrl;
        audioRef.current.play().catch(info => {
          console.info('Áudio pausado:', info);
        });
      } else {
        // Criar uma nova instância de áudio e definir o src
        audioRef.current = new Audio(currentAudioUrl);
        audioRef.current.play().catch(info => {
          console.info('Áudio pausado:', info);
        });
      }
    } else if (!currentAudioIsPlaying && audioRef.current) {
      // Se áudio não estiver tocando, pausar e limpar
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
      dispatch(setAudioState({ changeuuid: '', url: currentAudioUrl || '', isPlaying: !currentAudioIsPlaying }));
    }

    // Cleanup function para pausar áudio quando o componente desmonta mais sobre essa técnica abaixo e garantir a limpeza devida para que não haja imprevisto em usuário escolher outras rádios para escutar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [currentAudioUrl, currentAudioIsPlaying, dispatch]);

  return null;
};

export default AudioPlayer;

//  Cleanup é executada em situações específicas:

// Quando a Função de Limpeza é Executada:
// Antes da Reexecução do Efeito:

// Quando o efeito é reexecutado devido a mudanças nas dependências, 
// a função de limpeza do efeito anterior é chamada antes que o novo efeito seja aplicado. 
// Isso é importante para evitar que múltiplos efeitos antigos acumulem e causem problemas.
// Quando o Componente é Desmontado:

// Quando o componente é desmontado, a função de limpeza é chamada. 
// Isso garante que quaisquer efeitos colaterais criados pelo componente 
// (como timers, assinaturas de eventos, ou instâncias de áudio) sejam limpos e não causem vazamentos de 
// memória ou comportamentos indesejados.