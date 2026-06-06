import Common "common";

module {
  public type ContactInfo = {
    name : Text;
    email : Text;
    phone : Text;
    location : Text;
    linkedin : Text;
  };

  public type WorkExperience = {
    company : Text;
    title : Text;
    location : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
  };

  public type Education = {
    institution : Text;
    degree : Text;
    field : Text;
    startDate : Text;
    endDate : Text;
  };

  public type Resume = {
    contact : ContactInfo;
    summary : Text;
    workExperience : [WorkExperience];
    education : [Education];
    skills : [Text];
    updatedAt : Common.Timestamp;
  };
};
