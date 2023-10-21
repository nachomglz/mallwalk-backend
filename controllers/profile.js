const Profile = require('../models/profile');

const getPreferencesGroupBy = async (req, res) => {
    try {
        const profiles = await Profile.aggregate([
            {
              $unwind: '$categories'
            },
            {
              $unwind: '$keysWords'
            },
            {
              $group: {
                _id: {
                  category: '$categories',
                  keyword: '$keysWords'
                },
                count: { $sum: 1 }
              }
            },
            {
              $group: {
                _id: '$_id.category',
                keywords: {
                  $push: {
                    keyword: '$_id.keyword',
                    count: '$count'
                  }
                }
              }
            }
          ]);
        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postProfile = async (req, res) => {
    try {
        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPreferencesGroupBy
};
