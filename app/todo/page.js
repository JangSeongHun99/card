'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const CardGallery = () => {
  const cardImages = [
    { src: '/kheart1.jpg', width: 2480, height: 3508 },
    { src: '/kheart2.jpg', width: 2480, height: 3508 },
    { src: '/kheart3.jpg', width: 2480, height: 3508 },
    { src: '/kheart4.jpg', width: 2480, height: 3508 },
    { src: '/back.jpg', width: 2480, height: 3508 },
    { src: '/back.jpg', width: 2480, height: 3508}
  ];

  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(Array(cardImages.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    setCards(
      cardImages.map((card, index) => ({
        ...card,
        animationClass: `animateCard${index + 1}`, // 각 카드에 대한 애니메이션 클래스 이름 생성
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
    }
  };

  const handleCardClick = (index) => {
    flipCard(index);
    setIsDisabled(true);
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
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.gallery}>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`${styles.card} ${isFlipped[index] ? styles.flipped : ''} ${styles[card.animationClass]}`}
            style={{
              animationDelay: `${index * 0.15}s`,
              left: '50%',
              transform: 'translateX(-50%)',
              animationPlayState: animationCompleted ? 'running' : 'paused', // 애니메이션 시작 상태를 조절
            }}
            onClick={() => handleCardClick(index)}
            onAnimationEnd={onAnimationEnd}
          >
            <img
              className={styles.image}
              src={card.src}
              alt={`Card ${index}`}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }} // 이미지를 반응형으로 조정
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;