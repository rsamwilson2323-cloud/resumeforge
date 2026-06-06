import Map "mo:core/Map";
import Types "types/resume";
import Common "types/common";
import ResumeMixin "mixins/resume-api";

actor {
  let resumes : Map.Map<Common.UserId, Types.Resume>;

  include ResumeMixin(resumes);
};

