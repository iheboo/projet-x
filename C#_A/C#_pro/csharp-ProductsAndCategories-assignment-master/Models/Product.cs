#pragma warning disable CS8618

using System.ComponentModel.DataAnnotations;

namespace ProductsAndCategories.Models
{
    // Definition of the Product class
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        // The name of the product
        [Required]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(30, ErrorMessage = "Name must be at most 30 characters.")]
        public string Name { get; set; }

        // The description of the product
        [Required]
        [MinLength(2, ErrorMessage = "Description must be at least 2 characters.")]
        public string Description { get; set; }

        // The price of the product
        [Required(ErrorMessage = "The Price field is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        // The date and time when the product was created
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // The date and time when the product was last updated
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // A list of associations between this product and categories
        public List<Association> AllAssociations { get; set; } = new List<Association>();
    }
}
