import Map "mo:core/Map";
import Common "../types/common";
import Types "../types/resume";
import ResumeLib "../lib/resume";
import Principal "mo:core/Principal";

mixin (resumes : Map.Map<Common.UserId, Types.Resume>) {
  public shared func saveResume(resume : Types.Resume) : async () {
    ResumeLib.save(resumes, Principal.fromText("2vxsx-fae"), resume);
  };

  public shared query func loadResume() : async ?Types.Resume {
    ResumeLib.load(resumes, Principal.fromText("2vxsx-fae"));
  };
};
