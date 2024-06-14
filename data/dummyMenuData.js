const dummyMenuData = [
    {
        date: '2024.05.01',
        menu: {
            breakfast: '스크램블 에그, 토스트, 오렌지 주스',
            lunch: '치킨 샐러드, 스프, 물',
            dinner: '스테이크, 구운 채소, 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 600,
                dinner: 800,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.02',
        menu: {
            breakfast: '팬케이크, 베이컨, 커피',
            lunch: '햄버거, 프렌치 프라이, 콜라',
            dinner: '피자, 샐러드, 맥주',
            totalCalories: {
                breakfast: 700,
                lunch: 900,
                dinner: 1000,
                total: 2600
            }
        }
    },
    {
        date: '2024.05.03',
        menu: {
            breakfast: '그래놀라, 요거트, 블루베리',
            lunch: '터키 샌드위치, 칩스, 아이스 티',
            dinner: '파스타, 갈릭 브레드, 레드 와인',
            totalCalories: {
                breakfast: 400,
                lunch: 700,
                dinner: 900,
                total: 2000
            }
        }
    },
    {
        date: '2024.05.04',
        menu: {
            breakfast: '오트밀, 바나나, 우유',
            lunch: '쌀국수, 스프링롤, 차',
            dinner: '그릴드 치킨, 매쉬 포테이토, 콜라',
            totalCalories: {
                breakfast: 300,
                lunch: 600,
                dinner: 800,
                total: 1700

            }
        }
    },
    {
        date: '2024.05.05',
        menu: {
            breakfast: '크루아상, 잼, 커피',
            lunch: '라자냐, 샐러드, 레몬에이드',
            dinner: '타코, 나초, 맥주',
            totalCalories: {
                breakfast: 400,
                lunch: 700,
                dinner: 800,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.06',
        menu: {
            breakfast: '아보카도 토스트, 스무디, 차',
            lunch: '스시, 미소 스프, 녹차',
            dinner: '버팔로 윙, 콜슬로, 맥주',
            totalCalories: {
                breakfast: 500,
                lunch: 600,
                dinner: 800,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.07',
        menu: {
            breakfast: '베이글, 크림치즈, 커피',
            lunch: '클럽 샌드위치, 프렌치 프라이, 콜라',
            dinner: '램 찹, 로스트 포테이토, 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 800,
                dinner: 1000,
                total: 2300
            }
        }
    },
    {
        date: '2024.05.08',
        menu: {
            breakfast: '치아 푸딩, 라즈베리, 차',
            lunch: '피타 브레드, 후무스, 아이스 티',
            dinner: '비프 스튜, 바게트, 레드 와인',
            totalCalories: {
                breakfast: 400,
                lunch: 600,
                dinner: 900,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.09',
        menu: {
            breakfast: '팬케이크, 메이플 시럽, 오렌지 주스',
            lunch: '카프레제 샐러드, 브루스케타, 레몬에이드',
            dinner: '새우 튀김, 채소 볶음, 화이트 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 700,
                dinner: 900,
                total: 2100
            }
        }
    },
    {
        date: '2024.05.10',
        menu: {
            breakfast: '프렌치 토스트, 베이컨, 커피',
            lunch: '치킨 랩, 샐러드, 콜라',
            dinner: '스파게티 볼로네제, 마늘빵, 레드 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 700,
                dinner: 800,
                total: 2000
            }
        }
    },
    {
        date: '2024.05.11',
        menu: {
            breakfast: '와플, 휘핑크림, 딸기 주스',
            lunch: 'BLT 샌드위치, 수프, 아이스 티',
            dinner: '연어 스테이크, 아스파라거스, 화이트 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 700,
                dinner: 900,
                total: 2100
            }
        }
    },
    {
        date: '2024.05.12',
        menu: {
            breakfast: '베이글, 스크램블 에그, 커피',
            lunch: '퀴노아 샐러드, 스무디, 물',
            dinner: '치킨 카레, 난, 맥주',
            totalCalories: {
                breakfast: 500,
                lunch: 600,
                dinner: 800,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.13',
        menu: {
            breakfast: '시리얼, 우유, 오렌지',
            lunch: '페스토 파스타, 샐러드, 레몬에이드',
            dinner: '포크찹, 매쉬 포테이토, 레드 와인',
            totalCalories: {
                breakfast: 400,
                lunch: 700,
                dinner: 900,
                total: 2000
            }
        }
    },
    {
        date: '2024.05.14',
        menu: {
            breakfast: '요거트 파르페, 블루베리, 차',
            lunch: '그릭 샐러드, 피타, 아이스 티',
            dinner: '치킨 파마산, 스파게티, 레드 와인',
            totalCalories: {
                breakfast: 400,
                lunch: 600,
                dinner: 900,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.15',
        menu: {
            breakfast: '프렌치 토스트, 과일, 커피',
            lunch: '터키 샌드위치, 칩스, 콜라',
            dinner: '비프 타코, 나초, 맥주',
            totalCalories: {
                breakfast: 500,
                lunch: 700,
                dinner: 800,
                total: 2000
            }
        }
    },
    {
        date: '2024.05.16',
        menu: {
            breakfast: '오믈렛, 토스트, 주스',
            lunch: '버거, 프렌치 프라이, 밀크셰이크',
            dinner: '스시, 사시미, 녹차',
            totalCalories: {
                breakfast: 500,
                lunch: 800,
                dinner: 1000,
                total: 2300
            }
        }
    },
    {
        date: '2024.05.17',
        menu: {
            breakfast: '팬케이크, 베이컨, 커피',
            lunch: '파스타 샐러드, 스무디, 물',
            dinner: '치킨 알프레도, 브레드스틱, 레드 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 600,
                dinner: 800,
                total: 1900
            }
        }
    },
    {
        date: '2024.05.18',
        menu: {
            breakfast: '그래놀라, 요거트, 딸기',
            lunch: '햄버거, 감자튀김, 콜라',
            dinner: '스테이크, 구운 채소, 레드 와인',
            totalCalories: {
                breakfast: 400,
                lunch: 700,
                dinner: 900,
                total: 2000
            }
        }
    },
    {
        date: '2024.05.19',
        menu: {
            breakfast: '베이글, 크림치즈, 커피',
            lunch: '치킨 샐러드, 과일, 아이스 티',
            dinner: '피자, 샐러드, 맥주',
            totalCalories: {
                breakfast: 500,
                lunch: 700,
                dinner: 800,
                total: 2000
            }
        }
    },
    {
        date: '2024.05.20',
        menu: {
            breakfast: '와플, 과일, 차',
            lunch: '파스타, 샐러드, 레몬에이드',
            dinner: '비프 스튜, 바게트, 레드 와인',
            totalCalories: {
                breakfast: 500,
                lunch: 700,
                dinner: 900,
                total: 2100
            }
        }
    },
];

export default dummyMenuData;