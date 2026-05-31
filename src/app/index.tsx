import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

// Types
type TweetProps = {
  avatar: string;
  name: string;
  handle: string;
  time: string;
  verified: boolean;
  text: string;
  imageUri?: string;
  replies?: number;
  retweets?: number;
  likes?: number;
  views?: number;
  isAd?: boolean;
  showX?: boolean;
};

// Placeholder image URIs
const NBA_AVATAR = 'https://picsum.photos/seed/nba/48/48';
const LIVWELL_AVATAR = 'https://picsum.photos/seed/livwell/48/48';
const WEMBY_IMG = 'https://picsum.photos/seed/basketball/600/340';
const AD_IMG = 'https://picsum.photos/seed/wellness/600/200';
const USER_AVATAR = 'https://picsum.photos/seed/user99/48/48';

// Icon helpers (text-based, no icon library needed)
function Icon({ label, size = 14, color = '#71767B' }: { label: string; size?: number; color?: string }) {
  return <Text style={{ fontSize: size, color }}>{label}</Text>;
}

// Verified badge
function VerifiedBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>✓</Text>
    </View>
  );
}

// Tweet action row
function ActionRow({ replies = 0, retweets = 0, likes = 0, views = 0 }: {
  replies?: number; retweets?: number; likes?: number; views?: number;
}) {
  return (
    <View style={styles.actionRow}>
      <View style={styles.actionItem}>
        <Icon label="💬" size={16} />
        {replies > 0 && <Text style={styles.actionCount}>{replies}</Text>}
      </View>
      <View style={styles.actionItem}>
        <Icon label="🔁" size={16} />
        {retweets > 0 && <Text style={styles.actionCount}>{retweets}</Text>}
      </View>
      <View style={styles.actionItem}>
        <Icon label="🤍" size={16} />
        {likes > 0 && <Text style={styles.actionCount}>{likes}</Text>}
      </View>
      <View style={styles.actionItem}>
        <Icon label="📊" size={16} />
        {views > 0 && <Text style={styles.actionCount}>{views}</Text>}
      </View>
      <Icon label="🔖" size={16} />
      <Icon label="↑" size={16} />
    </View>
  );
}

// Single Tweet card
function Tweet({
  avatar, name, handle, time, verified, text,
  imageUri, replies, retweets, likes, views, isAd, showX,
}: TweetProps) {
  return (
    <View style={styles.tweet}>
      {/* Left column: avatar */}
      <View style={styles.tweetLeft}>
        <Image source={{ uri: avatar }} style={styles.tweetAvatar} />
        <View style={styles.threadLine} />
      </View>

      {/* Right column: content */}
      <View style={styles.tweetRight}>
        {/* Header row */}
        <View style={styles.tweetHeader}>
          <Text style={styles.tweetName}>{name}</Text>
          {verified && <VerifiedBadge />}
          <Text style={styles.tweetHandle}> @{handle} · {time}</Text>

          {/* Right: X dismiss or ad ellipsis */}
          <View style={styles.tweetHeaderRight}>
            {isAd && <Text style={styles.adLabel}>Ad</Text>}
            {showX
              ? <Text style={styles.dismissX}>✕</Text>
              : <Text style={styles.menuDots}>···</Text>}
          </View>
        </View>

        {/* Body text */}
        <Text style={styles.tweetBody}>{text}</Text>

        {/* Optional image */}
        {imageUri && (
          <View style={styles.tweetImageWrapper}>
            <Image source={{ uri: imageUri }} style={styles.tweetImage} />
            {/* Scoreboard overlay */}
            <View style={styles.scoreOverlay}>
              <View style={styles.scoreTeam}>
                <Text style={styles.scoreTeamName}>SAS</Text>
                <Text style={styles.scoreNumber}>95</Text>
              </View>
              <View style={styles.scoreMeta}>
                <Text style={styles.scoreTime}>8:40</Text>
                <Text style={styles.scoreQuarter}>4TH · 23</Text>
              </View>
              <View style={styles.scoreTeam}>
                <Text style={styles.scoreNumber}>86</Text>
                <Text style={styles.scoreTeamName}>OKC</Text>
              </View>
            </View>
          </View>
        )}

        {/* Actions */}
        <ActionRow replies={replies} retweets={retweets} likes={likes} views={views} />
      </View>
    </View>
  );
}

// Main Screen
export default function HomeScreen() {
  function handleAlert() {
    Alert.alert('Alert Button pressed');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <Image source={{ uri: USER_AVATAR }} style={styles.topBarAvatar} />
        <Text style={styles.xLogo}>𝕏</Text>
        <View style={styles.topBarRight}>
          <Icon label="✨" size={22} color="#E7E9EA" />
        </View>
      </View>

      {/* ── Tab bar ── */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabTextInactive}>For you</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.tabActive]}>
          <Text style={styles.tabTextActive}>Following</Text>
          <View style={styles.tabUnderline} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabTextInactive}>Add  +</Text>
          <View style={styles.tabDot} />
        </TouchableOpacity>
      </View>

      {/* ── Feed ── */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
        {/* Tweet 1 — with image and score overlay */}
        <Tweet
          avatar={NBA_AVATAR}
          name="NBA"
          handle="NBA"
          time="32s"
          verified
          showX
          text={"STEPBACK TRIPLE FOR 22 \uD83D\uDE28\n\nWEMBY DOING EVERYTHING HE CAN TO WIN GAME 7 FOR THE SPURS."}
          imageUri={WEMBY_IMG}
          replies={15}
          retweets={9}
          likes={58}
          views={667}
        />

        {/* Tweet 2 — text only with link */}
        <Tweet
          avatar={NBA_AVATAR}
          name="NBA"
          handle="NBA"
          time="10s"
          verified
          text={"SAS/OKC WINNER-TAKE-ALL GAME 7 \uD83C\uDCCF\n\nTAP TO WATCH ON NBC AND PEACOCK: nba.com/how-to-watch-g..."}
        />

        {/* Tweet 3 — Ad */}
        <Tweet
          avatar={LIVWELL_AVATAR}
          name="Live Well"
          handle="LWellNaturally"
          time=""
          verified
          isAd
          text={
            "Canadian Women Veterans may be eligible for supportive care coverage. From chronic pain to sleep disturbances, we provide free expert consultations, access to discrete personalized products and treatment plans, and full support with benefits through VAC and private insurances."
          }
          imageUri={AD_IMG}
        />

        {/* Spacer for the FAB */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* ── FAB (compose) ── */}
      <View style={styles.fab}>
        <Text style={styles.fabIcon}>＋</Text>
      </View>

      {/* ── Bottom Nav ── */}
      <View style={styles.bottomNav}>
        {['🏠', '🔍', '◎', '🔔', '✉️'].map((icon, i) => (
          <TouchableOpacity key={i} style={styles.navBtn}>
            <Text style={styles.navIcon}>{icon}</Text>
            {icon === '🔔' && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>8</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Alert Button (assignment requirement) ── */}
      <TouchableOpacity style={styles.alertButton} onPress={handleAlert}>
        <Text style={styles.alertButtonText}>Alert</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Styles
const C = {
  bg: '#000000',
  surface: '#16181C',
  border: '#2F3336',
  text: '#E7E9EA',
  subtext: '#71767B',
  blue: '#1D9BF0',
  badgeBg: '#1D9BF0',
  white: '#FFFFFF',
  red: '#F4212E',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  topBarAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  xLogo: {
    color: C.white,
    fontSize: 24,
    fontWeight: '900',
  },
  topBarRight: {
    width: 34,
    alignItems: 'flex-end',
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabActive: {},
  tabTextInactive: {
    color: C.subtext,
    fontSize: 15,
    fontWeight: '500',
  },
  tabTextActive: {
    color: C.text,
    fontSize: 15,
    fontWeight: '700',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    borderRadius: 2,
    backgroundColor: C.blue,
  },
  tabDot: {
    position: 'absolute',
    top: 10,
    right: 22,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.blue,
  },

  // Feed
  feed: {
    flex: 1,
  },

  // Tweet
  tweet: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: C.border,
  },
  tweetLeft: {
    alignItems: 'center',
    marginRight: 10,
    width: 48,
  },
  tweetAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  threadLine: {
    flex: 1,
    width: 2,
    backgroundColor: C.border,
    marginTop: 4,
    marginBottom: -12,
    alignSelf: 'center',
  },
  tweetRight: {
    flex: 1,
    paddingBottom: 12,
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  tweetName: {
    color: C.text,
    fontSize: 15,
    fontWeight: '700',
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.badgeBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  badgeText: {
    color: C.white,
    fontSize: 9,
    fontWeight: '900',
  },
  tweetHandle: {
    color: C.subtext,
    fontSize: 14,
    flex: 1,
  },
  tweetHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  adLabel: {
    color: C.subtext,
    fontSize: 13,
  },
  dismissX: {
    color: C.subtext,
    fontSize: 16,
  },
  menuDots: {
    color: C.subtext,
    fontSize: 18,
    letterSpacing: 1,
  },
  tweetBody: {
    color: C.text,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },

  // Tweet image + scoreboard overlay
  tweetImageWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  tweetImage: {
    width: '100%',
    height: 200,
  },
  scoreOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 12,
  },
  scoreTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreTeamName: {
    color: C.subtext,
    fontSize: 12,
    fontWeight: '600',
  },
  scoreNumber: {
    color: C.white,
    fontSize: 16,
    fontWeight: '800',
  },
  scoreMeta: {
    alignItems: 'center',
  },
  scoreTime: {
    color: C.text,
    fontSize: 11,
    fontWeight: '600',
  },
  scoreQuarter: {
    color: C.subtext,
    fontSize: 9,
  },

  // Action row
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionCount: {
    color: C.subtext,
    fontSize: 13,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 16,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: C.blue,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  fabIcon: {
    color: C.white,
    fontSize: 26,
    fontWeight: '300',
    marginTop: -2,
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.border,
    backgroundColor: C.bg,
  },
  navBtn: {
    position: 'relative',
    padding: 6,
  },
  navIcon: {
    fontSize: 22,
  },
  notifBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: C.blue,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '700',
  },

  // Alert button
  alertButton: {
    backgroundColor: C.blue,
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  alertButtonText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
