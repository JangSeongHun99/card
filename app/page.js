'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const CardGallery = () => {
  const cardImages = [
    { src: '/10.png', width: 2480, height: 3508 },
    { src: '/cardk.png', width: 2480, height: 3508 },
    {src: '/queen.png', width: 2480, height: 3508 },
    { src: '/jack.png', width: 2480, height: 3508 },
    { src: '/back.png', width: 2480, height: 3508 },
    { src: '/back.png', width: 2480, height: 3508}
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
    if (index >= 4 && index <= 5) {
      flipCard(index);
      setIsDisabled(true);
  
      // 마지막 두 장의 카드를 클릭하면 kheart1.jpg로 변경
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
        {cards.slice(0, 4).map((card, index) => (
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

        {cards.slice(4, 6).map((card, index) => (
          <div
            key={index + 4} // 충돌을 피하기 위해 4를 오프셋으로 추가
            className={`${styles.card} ${isFlipped[index + 4] ? styles.flipped : ''} ${styles[card.animationClass]}`}
            style={{
              animationDelay: `${(index + 4) * 0.15}s`, // 4를 인덱스에 오프셋으로 추가
              left: '50%',
              transform: 'translateX(-50%)',
              animationPlayState: animationCompleted ? 'running' : 'paused', // 애니메이션 시작 상태를 조절
            }}
            onClick={() => handleCardClick(index + 4)} // 4를 인덱스에 오프셋으로 추가
            onAnimationEnd={onAnimationEnd}
          >
            <img
              className={styles.image}
              src={isFlipped[index + 4] ? card.src : '/back.png'} // 4를 인덱스에 오프셋으로 추가
              alt={`Card ${index + 4}`} // 4를 인덱스에 오프셋으로 추가
              style={{ objectFit: 'contain', width: '100%', height: '100%' }} // 이미지를 반응형으로 조정
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;