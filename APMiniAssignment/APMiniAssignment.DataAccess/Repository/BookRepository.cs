using APMiniAssignment.Business.DbContext;
using APMiniAssignment.Business.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APMiniAssignment.DataAccess.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;
        public BookRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<int> AddProduct(BooksModel _event)
        {
            await _context.books.AddAsync(_event);
            await _context.SaveChangesAsync();
            return _event.Id;
        }



        public async Task<BooksModel> GetProductById(int id)
        {
            var dbproduct = await _context.books.FindAsync(id);
            return dbproduct;
        }

        public async Task<List<BooksModel>> GetAllProducts()
        {
            return await _context.books.ToListAsync();
        }

        public bool IsAvailable(BooksModel _data)
        {
            var query = from available in _context.books
                        where available.Id == _data.Id
                        select available;

            foreach (var r in query)
            {
                if (r.Is_Book_Available == false || r.Lent_By_User_id == _data.Lent_By_User_id)
                {
                    return false;
                }
            }
            return true;
        }

        public async Task<BooksModel> Editbook(BooksModel _product)
        {
            var dborder = await _context.books.FindAsync(_product.Id);

            dborder.Name = _product.Name;
            dborder.Rating = _product.Rating;
            dborder.Author = _product.Author;
            dborder.Genre = _product.Genre;
            dborder.Is_Book_Available = false;
            dborder.Description = _product.Description;
            dborder.Lent_By_User_id = _product.Lent_By_User_id;
            dborder.Currently_Borrowed_By_User_Id = _product.Currently_Borrowed_By_User_Id;
            await _context.SaveChangesAsync();
            return dborder;
        }
    }
}
