'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const cardImages = [
    { src: '/kheart1.jpg', width: 2480, height: 3508 },
    { src: '/kheart2.jpg', width: 2480, height: 3508 },
    { src: '/kheart3.jpg', width: 2480, height: 3508 },
    { src: '/kheart4.jpg', width: 2480, height: 3508 },
    { src: '/kheart5.jpg', width: 2480, height: 3508 },
    { src: '/kheart6.jpg', width: 2480, height: 3508 },
    { src: '/back.jpg', width: 2480, height: 3508}
  ];
  const [cards, setCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(Array(cardImages.length).fill(false));
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setCards(cardImages);
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


  return (
    <div className={styles.gallery}>
      <div className={styles.horizontalCards}>
        {cards.slice(0, 4).map((card, index) => (
          <div key={index} className={styles.card} style={{ animationDelay: `${index * 0.2}s` }}>
            <img src={card.src} alt={`Card ${index + 1}`} className={styles.image} />
          </div>
        ))}
      </div>
      <div className={styles.verticalCards}>
        {cards.slice(4, 6).map((card, index) => (
          <div
            key={index + 4}
            className={`${styles.card} ${isFlipped[index + 4] ? styles.flipped : ''}`}
            style={{ animationDelay: `${(index + 4) * 0.2}s` }}
            onClick={() => handleCardClick(index + 4)}
          >
            <img
              src={isFlipped[index + 4] ? cards[6].src : card.src}
              alt={`Card ${index + 5}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
