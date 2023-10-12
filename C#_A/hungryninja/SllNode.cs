using System;

public class SllNode
{
    public int Value;
    public SllNode Next;

    public SllNode(int value)
    {
        Value = value;
        Next = null;
    }
}

public class SinglyLinkedList
{
    public SllNode Head;

    public SinglyLinkedList()
    {
        Head = null;
    }

    public void Add(int value)
    {
        SllNode newNode = new SllNode(value);
        if (Head == null)
        {
            Head = newNode;
        }
        else
        {
            SllNode runner = Head;
            while (runner.Next != null)
            {
                runner = runner.Next;
            }
            runner.Next = newNode;
        }
    }

    public void Remove()
    {
        if (Head == null)
        {
            Console.WriteLine("The list is empty. Nothing to remove.");
            return;
        }

        if (Head.Next == null)
        {
            Head = null;
            return;
        }

        SllNode runner = Head;
        while (runner.Next.Next != null)
        {
            runner = runner.Next;
        }
        runner.Next = null;
    }

    public void PrintValues()
    {
        SllNode runner = Head;
        while (runner != null)
        {
            Console.Write(runner.Value + " -> ");
            runner = runner.Next;
        }
        Console.WriteLine("null");
    }

    public SllNode Find(int value)
    {
        SllNode runner = Head;
        while (runner != null)
        {
            if (runner.Value == value)
                return runner;
            runner = runner.Next;
        }
        return null;
    }

    public void RemoveAt(int n)
    {
        if (Head == null || n < 0)
        {
            Console.WriteLine("Invalid operation.");
            return;
        }

        if (n == 0)
        {
            Head = Head.Next;
            return;
        }

        SllNode runner = Head;
        for (int i = 0; i < n - 1; i++)
        {
            if (runner.Next == null)
            {
                Console.WriteLine("Index out of range.");
                return;
            }
            runner = runner.Next;
        }

        if (runner.Next != null)
        {
            runner.Next = runner.Next.Next;
        }
        else
        {
            Console.WriteLine("Index out of range.");
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        SinglyLinkedList myList = new SinglyLinkedList();

        myList.Add(1);
        myList.Add(2);
        myList.Add(3);
        myList.Add(4);

        Console.WriteLine("Original List:");
        myList.PrintValues();

        myList.Remove();
        Console.WriteLine("List after Remove:");
        myList.PrintValues();

        SllNode nodeToFind = myList.Find(2);
        Console.WriteLine("Node with value 2 found: " + nodeToFind.Value);

        myList.RemoveAt(1);
        Console.WriteLine("List after RemoveAt(1):");
        myList.PrintValues();
    }
}
