using Microsoft.EntityFrameworkCore;
using GuestHouseBooking.Data;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

// This line fixes the "admin@guesthouse.com" bug
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// --- Add this section for CORS ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          // This allows your local Angular app
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// --- End of CORS section ---

// Add services to the container.
builder.Services.AddControllers();

// --- Add this section for JWT Authentication ---
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// ******************************************************
// ***** THIS IS THE MISSING LINE THAT FIXES STEP 5 *****
// ******************************************************
builder.Services.AddAuthorization();
// ******************************************************

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// --- Configure Swagger to use JWT ---
builder.Services.AddSwaggerGen(options =>
{
    // 1. Add the Security Definition (what kind of auth)
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter 'Bearer' [space] and then your token in the text input below.\n\nExample: \"Bearer 12345abcdef\"",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    // 2. Add the Security Requirement (how to use it)
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});
// --- End of Swagger config ---

// --- Add this new, upgraded seeder function ---
async Task SeedDatabase(IServiceProvider serviceProvider, IConfiguration config)
{
    using (var scope = serviceProvider.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        // 1. Seed Roles
        string[] roleNames = { "Admin", "User" };
        Dictionary<string, GuestHouseBooking.Models.Role> roles = new();

        foreach (var roleName in roleNames)
        {
            var role = await context.Roles.FirstOrDefaultAsync(r => r.RoleName == roleName);
            if (role == null)
            {
                role = new GuestHouseBooking.Models.Role { RoleName = roleName };
                context.Roles.Add(role);
            }
            roles[roleName] = role;
        }
        await context.SaveChangesAsync();

        // 2. Seed Super Admin
        var adminEmail = config["SuperAdminAccount:Email"];
        if (!await context.Users.AnyAsync(u => u.Email == adminEmail))
        {
            var adminUser = new GuestHouseBooking.Models.User
            {
                UserName = config["SuperAdminAccount:UserName"],
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(config["SuperAdminAccount:Password"]),
                Gender = "Male", // Default
                RoleId = roles["Admin"].RoleId, // Assign Admin role
                IsActive = true,
                CreatedDate = DateTime.UtcNow,
                CreatedBy = 0 // 0 = System
            };
            context.Users.Add(adminUser);
            await context.SaveChangesAsync();
        }
    }
}
// --- End of seeder section ---

var app = builder.Build();

// --- Add this line to RUN the new seeder ---
await SeedDatabase(app.Services, app.Configuration);
// --- End of line to run seeder ---

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// This tells the app to *use* the CORS policy we just added.
// It *must* go before `app.UseAuthorization()` and `app.MapControllers()`.
app.UseCors(MyAllowSpecificOrigins);

// --- Add these two lines ---
app.UseAuthentication();
app.UseAuthorization(); // <-- This line is now correct
// --- End of section ---

app.MapControllers();

app.Run();