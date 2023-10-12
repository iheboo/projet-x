using System;

public class DllNode
{
    public int Value;
    public DllNode Next;
    public DllNode Prev;

    public DllNode(int val)
    {
        Value = val;
        Next = null;
        Prev = null;
    }
}

public class DoublyLinkedList
{
    public DllNode Head;

    public void Add(int value)
    {
        DllNode newNode = new DllNode(value);

        if (Head == null)
        {
            Head = newNode;
        }
        else
        {
            DllNode current = Head;
            while (current.Next != null)
            {
                current = current.Next;
            }
            current.Next = newNode;
            newNode.Prev = current;
        }
    }

    public bool Remove(int value)
    {
        if (Head == null)
        {
            return false;
        }

        if (Head.Value == value)
        {
            Head = Head.Next;
            if (Head != null)
            {
                Head.Prev = null;
            }
            return true;
        }

        DllNode current = Head;
        while (current != null)
        {
            if (current.Value == value)
            {
                current.Prev.Next = current.Next;
                if (current.Next != null)
                {
                    current.Next.Prev = current.Prev;
                }
                return true;
            }
            current = current.Next;
        }

        return false;
    }

    public void Reverse()
    {
        if (Head == null || Head.Next == null)
        {
            return; // Nothing to reverse
        }

        DllNode current = Head;
        DllNode prevNode = null;

        while (current != null)
        {
            DllNode nextNode = current.Next;
            current.Next = prevNode;
            current.Prev = nextNode;
            prevNode = current;
            current = nextNode;
        }

        Head = prevNode;
    }
}

class Program
{
    static void Main(string[] args)
    {
        DoublyLinkedList myList = new DoublyLinkedList();

        myList.Add(1);
        myList.Add(2);
        myList.Add(3);
        myList.Add(4);

        Console.WriteLine("Original List:");
        PrintList(myList);

        myList.Remove(2);
        Console.WriteLine("List after Remove(2):");
        PrintList(myList);

        myList.Reverse();
        Console.WriteLine("Reversed List:");
        PrintList(myList);
    }

    static void PrintList(DoublyLinkedList list)
    {
        DllNode current = list.Head;
        while (current != null)
        {
            Console.Write(current.Value + " <-> ");
            current = current.Next;
        }
        Console.WriteLine("null");
    }
}
