using AutoMapper;
using Entities.Dbo;
using Entities.Lookup;
using Entities.Mapping;
using NHibernate.Driver;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace Services.mapping
{
    public class EntityToModel  : Profile
    {
        public EntityToModel()
        {
            CreateMap<UsersMap, Users>()
                    .ForMember(
                        dest => dest.Id,
                        opt => opt.MapFrom(src => Guid.NewGuid())
                    )
                    .ForMember(
                        dest => dest.IsActive,
                        opt => opt.MapFrom(src => $"{src.Id()} ")
                    )
                
         ;
        }
     public  List<Users> Users = new List<Users>();
    }
}