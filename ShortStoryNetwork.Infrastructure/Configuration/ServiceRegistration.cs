using Microsoft.Extensions.DependencyInjection;
using ShortStoryNetwork.Application;
using ShortStoryNetwork.Application.Services;
using ShortStoryNetwork.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShortStoryNetwork.Infrastructure.Configuration
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IStatVowelsRepository, StatVowelsRepository>();
            services.AddScoped<IUserInfoRepository, UserInfoRepository>();
            services.AddScoped<IPostRepository, PostRepository>();            

            return services;
        }        
    }
}
