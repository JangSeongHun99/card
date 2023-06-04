'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import cardFlipSound from '../public/cardSlide8.mp3';

const CardGallery = () => {
  const cardImages = [
    { src: '/10.png', width: 2480, height: 3508 },
    { src: '/kspade.png', width: 2480, height: 3508 },
    { src: '/queen.png', width: 2480, height: 3508 },
    { src: '/jack.png', width: 2480, height: 3508 },
    { src: '/back.png', width: 2480, height: 3508 },
    { src: '/back.png', width: 2480, height: 3508 }
  ];

  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(Array(cardImages.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  useEffect(() => {
    setCards(
      cardImages.map((card, index) => ({
        ...card,
        animationClass: `animateCard${index + 1}`,
      }))
    );
  }, []);

  const flipCard = (index) => {
    if (index >= 4 && index <= 5 && !isDisabled) {
      setIsFlipped((prevFlipped) => {
        const newFlipped = [...prevFlipped];
        newFlipped[index] = !newFlipped[index];
        if (newFlipped[index]) {
          newFlipped[index === 4 ? 5 : 4] = false;
        }
        return newFlipped;
      });
      playcardflipsound();
    }
  };

  const handleCardClick = (index) => {
    if (index >= 4 && index <= 5) {
      flipCard(index);
      setIsDisabled(true);

      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].src = '/joker.png';
        return newCards;
      });

    }
  };

  useEffect(() => {
    if (isFlipped.some((flipped) => flipped)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [isFlipped]);

  const onAnimationEnd = () => {
    setAnimationCompleted(true);
  };

  useEffect(() => {
    if (isAnimationStarted) {
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
      }, );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAnimationStarted]);

  const playcardflipsound = () => {
    const audio = new Audio(cardFlipSound);
    audio.play();
  };

  useEffect(() => {
    if (animationCompleted) {
      cards.slice(0, 6).forEach((_, index) => {
        const timer = setTimeout(() => {
          playcardflipsound();
        }, index * 150);
        return () => {
          clearTimeout(timer);
        };
      });
    }
  }, [animationCompleted]);

  const startAnimation = () => {
    setIsAnimationStarted(true);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.cardContainer}>
        {cards.slice(0, 4).map((card, index) => (
          <div
            key={index}
            className={`${styles.card} ${isFlipped[index] ? styles.flipped : ''} ${styles[card.animationClass]}`}
            style={{
              animationDelay: `${index * 0.15}s`,
              left: '50%',
              transform: 'translateX(-50%)',
              animationPlayState: animationCompleted ? 'running' : 'paused',
            }}
            onClick={() => handleCardClick(index)}
            onAnimationEnd={onAnimationEnd}
          >
            <img
              className={styles.image}
              src={card.src}
              alt={`Card ${index}`}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
        ))}

        {cards.slice(4, 6).map((card, index) => (
          <div
            key={index + 4}
            className={`${styles.card} ${isFlipped[index + 4] ? styles.flipped : ''} ${styles[card.animationClass]}`}
            style={{
              animationDelay: `${(index + 4) * 0.15}s`,
              left: '50%',
              transform: 'translateX(-50%)',
              animationPlayState: animationCompleted ? 'running' : 'paused',
            }}
            onClick={() => handleCardClick(index + 4)}
            onAnimationEnd={onAnimationEnd}
          >
            <img
              className={styles.image}
              src={isFlipped[index + 4] ? card.src : '/back.png'}
              alt={`Card ${index + 4}`}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </div>
      <button onClick={startAnimation}>start</button>
    </div>
  );
};

export default CardGallery;