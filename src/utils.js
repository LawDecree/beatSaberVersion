const _ = require("lodash");

module.exports = {
  transInfo: info20 => {
    const difficultyLevels = _.get(
      info20,
      "_difficultyBeatmapSets[0]._difficultyBeatmaps",
      []
    ).map(lvl => {
      return {
        difficulty: lvl._difficulty,
        difficultyRank: Math.round((lvl._difficultyRank + 1) / 2),
        audioPath: info20._songFilename.replace(/\.egg$/, ".ogg"),
        jsonPath: lvl._beatmapFilename.replace(/\.dat$/, ".json"),
        offset: 0,
        oldOffset: 0
      };
    });
    return {
      songName: info20._songName,
      songSubName: info20._songSubName,
      authorName: info20._songAuthorName,
      beatsPerMinute: info20._beatsPerMinute,
      previewStartTime: info20._previewStartTime,
      previewDuration: info20._previewDuration,
      coverImagePath: info20._coverImagePath,
      environmentName: info20._environmentName,
      difficultyLevels
    };
  },
  transDifficultyInfo: (diffInfo20, info20) => {
    return {
      _version: "1.5.0",
      _beatsPerMinute: info20._beatsPerMinute,
      _beatsPerBar: 16, // todo
      _noteJumpSpeed: _.get(
        info20,
        "_difficultyBeatmapSets[0]._difficultyBeatmaps[0]._noteJumpMovementSpeed",
        19
      ),
      _shuffle: info20._shuffle,
      _shufflePeriod: info20._shufflePeriod,
      _events: diffInfo20._events,
      _notes: diffInfo20._notes,
      _obstacles: diffInfo20._obstacles
    };
  }
};
