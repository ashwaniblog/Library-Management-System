using APMiniAssignment.Business.Models;
using Microsoft.AspNetCore.Identity;

namespace APMiniAssignment.DataAccess.Repository
{
    public interface IAccountRepository
    {
        Task<IdentityResult> CreateUserAsync(SignUpModel userModel);
        Task<string> GetLoginUserId(string email);
        Task<int> GetMyTokens(string email);
        Task<string> PasswordSignInAsync(SignInModel signInModel);
        Task SignOutAsync();

        //Task UpdateUser(SignUpModel userdata);
    }
}