

namespace CardGame
{
    public class Card
    {
        public string Name { get; }
        public string Suit { get; }
        public int Value { get; }

        public Card(string name, string suit, int value)
        {
            Name = name;
            Suit = suit;
            Value = value;
        }

        public void Print()
        {
            Console.WriteLine($"Name: {Name}, Suit: {Suit}, Value: {Value}");
        }
    }

    public class Deck
    {
        private List<Card> Cards { get; } = new List<Card>();

        public Deck()
        {
            Cards.AddRange(InitializeDeck());
        }

        private static IEnumerable<Card> InitializeDeck()
        {
            List<Card> deck = new ();
            string[] suits = { "Clubs", "Spades", "Hearts", "Diamonds" };

            foreach (string suit in suits)
            {
                for (int value = 1; value <= 13; value++)
                {
                    string name = GetNameFromValue(value);
                    deck.Add(new Card(name, suit, value));
                }
            }

            return deck;
        }

        private static string GetNameFromValue(int value)
        {
            return value switch
            {
                1 => "Ace",
                11 => "Jack",
                12 => "Queen",
                13 => "King",
                _ => value.ToString(),
            };
        }

        public Card? Deal()
        {
            if (Cards.Count > 0)
            {
                Card topCard = Cards[0];
                Cards.RemoveAt(0);
                return topCard;
            }
            else
            {
                Console.WriteLine("No more cards to deal.");
                return null;
            }
        }

        public void Reset()
        {
            Cards.Clear();
            Cards.AddRange(InitializeDeck());
        }

        public void Shuffle()
        {
            Random random = new ();
            int n = Cards.Count;

            for (int i = n - 1; i > 0; i--)
            {
                int k = random.Next(i + 1);

                (Cards[i], Cards[k]) = (Cards[k], Cards[i]);
            }
        }
    }

    class Player
    {
        public string Name { get; }
        public List<Card> Hand { get; }

        public Player(string name)
        {
            Name = name;
            Hand = new List<Card>();
        }

        public Card Draw(Deck deck)
        {
            Card drawnCard = deck.Deal() ?? new Card("Default", "Default", 0);
            Hand.Add(drawnCard);
            return drawnCard;
        }

        public Card? Discard(int index)
        {
            if (index >= 0 && index < Hand.Count)
            {
                Card discardedCard = Hand[index];
                Hand.RemoveAt(index);
                return discardedCard;
            }
            return null;
        }
    }

    class Program
    {
        static void Main()
        {
            Deck deck = new ();
            deck.Shuffle();

            Player player1 = new ("Player 1");

            for (int i = 0; i < 3; i++)
            {
                Card drawnCard = player1.Draw(deck);
                if (drawnCard != null)
                {
                    Console.WriteLine($"{player1.Name} drew:");
                    drawnCard.Print();
                }
            }

            Console.WriteLine($"{player1.Name}'s Hand:");
            foreach (Card card in player1.Hand)
            {
                card.Print();
            }

            int discardIndex = 1;
            Card? discardedCard = player1.Discard(discardIndex);
            if (discardedCard != null)
            {
                Console.WriteLine($"{player1.Name} discarded:");
                discardedCard.Print();
            }

            Console.WriteLine($"{player1.Name}'s Updated Hand:");
            foreach (Card card in player1.Hand)
            {
                card.Print();
            }
        }
    }
}
