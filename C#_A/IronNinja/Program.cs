
interface IConsumable
{
    string Name { get; set; }
    int Calories { get; set; }
    bool IsSpicy { get; set; }
    bool IsSweet { get; set; }
    string GetInfo();
}
class Food : IConsumable
{
    public string Name { get; set; }
    public int Calories { get; set; }
    public bool IsSpicy { get; set; }
    public bool IsSweet { get; set; }

    public string GetInfo()
    {
        return $"{Name} (Food). Calories: {Calories}. Spicy?: {IsSpicy}, Sweet?: {IsSweet}";
    }

    public Food(string name, int calories, bool spicy, bool sweet)
    {
        Name = name;
        Calories = calories;
        IsSpicy = spicy;
        IsSweet = sweet;
    }
}

class Drink : IConsumable
{
    public string Name { get; set; }
    public int Calories { get; set; }
    public bool IsSpicy { get; set; }
    public bool IsSweet { get; set; }

    public string GetInfo()
    {
        return $"{Name} (Drink). Calories: {Calories}. Spicy?: {IsSpicy}, Sweet?: {IsSweet}";
    }

    public Drink(string name, int calories)
    {
        Name = name;
        Calories = calories;
        IsSpicy = false;
        IsSweet = true; 
    }
}


abstract class Ninja
{
    protected int calorieIntake;
    public List<IConsumable> ConsumptionHistory;

    public Ninja()
    {
        calorieIntake = 0;
        ConsumptionHistory = new List<IConsumable>();
    }

    public abstract bool IsFull { get; }
    public abstract void Consume(IConsumable item);
}

class Buffet
{
    private List<IConsumable> menu;

    public Buffet()
    {
        menu = new List<IConsumable>
        {
            new Food("Pizza", 300, false, false),
            new Food("Burger", 250, false, false),
            new Food("Salad", 100, false, false),
            new Food("Ice Cream", 500, false, true),
            new Food("Spaghetti", 400, false, false),
            new Food("Curry", 600, true, false),
            new Food("Sushi", 350, false, false),
            new Food("Cake", 450, false, true),
            new Drink("Water", 0),
            new Drink("Soda", 150),
            new Drink("Juice", 200),
            new Drink("Tea", 50),
        };
    }

    public IConsumable Serve()
    {
        Random rand = new ();
        int randomIndex = rand.Next(menu.Count);
        return menu[randomIndex];
    }
}


class SweetTooth : Ninja
{
    public override bool IsFull => calorieIntake >= 1500;

    public override void Consume(IConsumable item)
    {
        if (!IsFull)
        {
            int additionalCalories = item.IsSweet ? item.Calories + 10 : item.Calories;
            calorieIntake += additionalCalories;
            ConsumptionHistory.Add(item);
            Console.WriteLine($"SweetTooth consumed {item.GetInfo()} and gained {additionalCalories} calories.");
        }
        else
        {
            Console.WriteLine("SweetTooth is full and cannot eat anymore.");
        }
    }
}


class SpiceHound : Ninja
{
    public override bool IsFull => calorieIntake >= 1200;

    public override void Consume(IConsumable item)
    {
        if (!IsFull)
        {
            int additionalCalories = item.IsSpicy ? item.Calories - 5 : item.Calories;
            calorieIntake += additionalCalories;
            ConsumptionHistory.Add(item);
            Console.WriteLine($"SpiceHound consumed {item.GetInfo()} and gained {additionalCalories} calories.");
        }
        else
        {
            Console.WriteLine("SpiceHound is full and cannot eat anymore.");
        }
    }
}

class Program
{
    static void Main()
    {
        Buffet buffet = new ();
        SweetTooth sweetTooth = new ();
        SpiceHound spiceHound = new ();

        while (!sweetTooth.IsFull)
        {
            IConsumable item = buffet.Serve();
            sweetTooth.Consume(item);
        }

        while (!spiceHound.IsFull)
        {
            IConsumable item = buffet.Serve();
            spiceHound.Consume(item);
        }

        Console.WriteLine($"SweetTooth consumed {sweetTooth.ConsumptionHistory.Count} items.");
        Console.WriteLine($"SpiceHound consumed {spiceHound.ConsumptionHistory.Count} items.");
    }
}
