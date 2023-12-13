using APMiniAssignment.Business.Models;
using APMiniAssignment.DataAccess.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace APMiniAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountController(IAccountRepository accountRepository,
            UserManager<ApplicationUser> userManager)
        {
            _accountRepository = accountRepository;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<SignUpModel> SignUp([FromBody] SignUpModel user)
        {
            if (user != null)
            {
                var answer = await _accountRepository.CreateUserAsync(user);

                if (!answer.Succeeded)
                {
                    foreach (var errorMessage in answer.Errors)
                    {
                        ModelState.AddModelError("", errorMessage.Description);
                    }
                    return null;
                }

                return user;
            }

            return user;
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> Login(SignInModel user)
        {
            if (ModelState.IsValid)
            {
                var answer = await _accountRepository.PasswordSignInAsync(user);
                if (string.IsNullOrEmpty(answer))
                {
                    return null;
                }
                ModelState.AddModelError("", "Invalid credentials");
                var result = new LoginResponseModel();
                var userdetails = await _userManager.FindByEmailAsync(user.Email);
                result.Tokens = userdetails.Token_Available; 
                result.Email = user.Email;
                result.Password = user.Password;
                result.Token = answer;
                result.Id = userdetails.Id.ToString();
                return Ok(result);
            }
            return null;
        }

        [HttpGet]
        [Route("signout")]
        public async Task<int> Logout()
        {
            await _accountRepository.SignOutAsync();
            return StatusCodes.Status200OK;
        }

        [HttpGet]
        [Route("fetchId/{email}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetLoginUserID(string email)
        {
            var Id = await _accountRepository.GetLoginUserId(email);
            var result = new LoginResponseModel();
            result.Id = Id;
            return Ok(result);
        }


        [HttpGet]
        [Route("fetchtokens/{email}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetTokens(string email)
        {
            var tokens = await _accountRepository.GetMyTokens(email);
            return Ok(tokens);
        }






        [HttpPut]
        [Route("borrow")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UpdateUserData(BorrowModel product)
        {


            var Userdata = await _userManager.FindByIdAsync(product.Lent_By_User_id);

            Userdata.FullName = Userdata.FullName;
            Userdata.Email = Userdata.Email;
            Userdata.UserName = Userdata.UserName;
            Userdata.Token_Available = Userdata.Token_Available + 1;
            Userdata.Books_Borrowed = Userdata.Books_Borrowed;
            Userdata.Books_lent = Userdata.Books_lent + 1;

            var answer = await _userManager.UpdateAsync(Userdata);

            var Borrowerdata = await _userManager.FindByIdAsync(product.Currently_Borrowed_By_User_Id);
            Borrowerdata.FullName = Borrowerdata.FullName;
            Borrowerdata.Email = Borrowerdata.Email;
            Borrowerdata.UserName = Borrowerdata.UserName;
            Borrowerdata.Token_Available = Borrowerdata.Token_Available - 1;
            Borrowerdata.Books_Borrowed = Borrowerdata.Books_Borrowed + 1;
            Borrowerdata.Books_lent = Borrowerdata.Books_lent;

            var borrowans = await _userManager.UpdateAsync(Borrowerdata);
            return Ok();
        }

    }
}
