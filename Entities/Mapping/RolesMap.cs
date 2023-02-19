using Entities.Lookup;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Mapping
{
    public class RolesMap : ClassMap<Role>
    {
        public RolesMap()
        {
            Schema("LOOKUP");
            Table("Roles");
            LazyLoad();
            Id(x => x.Code).GeneratedBy.Identity().Column("Code");
            Map(x => x.Description).Column("Description").Not.Nullable();
        }
    }
}
