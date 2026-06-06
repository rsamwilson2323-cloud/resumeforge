import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/resume";

module {
  public func save(
    resumes : Map.Map<Common.UserId, Types.Resume>,
    owner : Common.UserId,
    resume : Types.Resume,
  ) {
    resumes.add(owner, resume);
  };

  public func load(
    resumes : Map.Map<Common.UserId, Types.Resume>,
    owner : Common.UserId,
  ) : ?Types.Resume {
    resumes.get(owner);
  };
};
