import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';

interface AudioPlayerProps {
  audioId: string | undefined;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioId }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const { currentAudioIsPlaying, currentAudioUrl } = useSelector((state: RootState) => ({
    currentAudioIsPlaying: state.register.currentAudioIsPlaying,
    currentAudioUrl: state.register.currentAudioUrl,
  }));

  //console.log('audioId', audioId);
  // console.log('isPlaying', isPlaying);
  // console.log('audio', audio);
  // console.log('audio', audio);
  console.log('currentAudioIsPlaying', currentAudioIsPlaying);
  

  useEffect(() => {
    console.log('entrouuuuuuuuuuuuuuuuuu', currentAudioIsPlaying);
    
    if (currentAudioUrl && currentAudioIsPlaying) {
      console.log('entrou no if do useeffect', currentAudioUrl);
      
      const newAudio = new Audio(currentAudioUrl); // Passa a URL diretamente para o construtor
      newAudio.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      setAudio(newAudio);
    }
    if (!currentAudioIsPlaying) {
      if (audio) {
        console.log('stopppppppppppppppppppppppppppppppppppppppp');
        const newAudio = new Audio('currentAudioUrl'); // Passa a URL diretamente para o construtor
        newAudio.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setAudio(newAudio);
        
        audio.pause();
        //audio.currentTime = 0; // Opcional: Volta ao início do áudio
      }
    }
  }, [currentAudioIsPlaying]);

  
  

  // useEffect(() => {
  //   if (audio) {
  //       audio.play();
  //     } 

  //     // return () => {
  //     //   audio.pause();
  //     //   audio.src = '';
  //     // };
  // }, [audio]);

    // useEffect(() => {
  //   if (audio) {
  //     if (isPlaying) {
  //       audio.play();
  //     } else {
  //       audio.pause();
  //     }

  //     return () => {
  //       audio.pause();
  //       audio.src = '';
  //     };
  //   }
  // }, [audio, isPlaying]);

  return (
    
      <audio src={currentAudioUrl || ''} autoPlay />
    
  );
};

export default AudioPlayer;
