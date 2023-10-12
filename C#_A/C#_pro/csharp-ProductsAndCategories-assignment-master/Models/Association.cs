#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;

namespace ProductsAndCategories.Models
{
    // Definition of the Association class
    public class Association
    {
        [Key]
        public int AssociationId { get; set; }

        // The ID of the associated product
        public int ProductId { get; set; }

        // The ID of the associated category
        public int CategoryId { get; set; }

        // Navigation property representing the associated product
        public Product? Product { get; set; }

        // Navigation property representing the associated category
        public Category? Category { get; set; }
    }
}
