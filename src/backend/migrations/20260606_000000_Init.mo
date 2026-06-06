import Map "mo:core/Map";

module {
  type UserId = Principal;

  type OldActor = {};

  type NewActor = {
    resumes : Map.Map<UserId, Resume>;
  };

  type ContactInfo = {
    name : Text;
    email : Text;
    phone : Text;
    location : Text;
    linkedin : Text;
  };

  type WorkExperience = {
    company : Text;
    title : Text;
    location : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
  };

  type Education = {
    institution : Text;
    degree : Text;
    field : Text;
    startDate : Text;
    endDate : Text;
  };

  type Resume = {
    contact : ContactInfo;
    summary : Text;
    workExperience : [WorkExperience];
    education : [Education];
    skills : [Text];
    updatedAt : Int;
  };

  public func migration(_ : OldActor) : NewActor {
    { resumes = Map.empty<UserId, Resume>() };
  };
};
