using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var key = "super_secret_jwt_key_12345";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

builder.Services.AddSingleton<UserStore>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

public class UserStore
{
    private List<User> users = new()
    {
        new User { Id = 1, Username = "admin", Password = "admin", Email = "admin@demo.com" }
    };
    public List<User> GetAll() => users;
    public User? GetById(int id) => users.FirstOrDefault(u => u.Id == id);
    public User? GetByUsername(string username) => users.FirstOrDefault(u => u.Username == username);
    public void Add(User user) => users.Add(user);
    public void Update(User user)
    {
        var idx = users.FindIndex(u => u.Id == user.Id);
        if (idx != -1) users[idx] = user;
    }
    public void Delete(int id) => users.RemoveAll(u => u.Id == id);
}

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Password { get; set; } = "";
    public string Email { get; set; } = "";
}
