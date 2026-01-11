import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// All Clash Royale cards from the repository
const CARD_DATA = [
  { id: 'Arrows', name: 'Arrows', image: require('./assets/cards/Arrows.png') },
  { id: 'BabyD', name: 'Baby Dragon', image: require('./assets/cards/BabyD.png') },
  { id: 'Balloon', name: 'Balloon', image: require('./assets/cards/Balloon.png') },
  { id: 'Bandit', name: 'Bandit', image: require('./assets/cards/Bandit.png') },
  { id: 'BarbBarrel', name: 'Barbarian Barrel', image: require('./assets/cards/BarbBarrel.png') },
  { id: 'BarbHut', name: 'Barbarian Hut', image: require('./assets/cards/BarbHut.png') },
  { id: 'Barbs', name: 'Barbarians', image: require('./assets/cards/Barbs.png') },
  { id: 'BarbsEvo', name: 'Barbarians - Evolution', image: require('./assets/cards/Barbs (1).png') },
  { id: 'Barrel', name: 'Skeleton Barrel', image: require('./assets/cards/Barrel.png') },
  { id: 'BarrelEvo', name: 'Skeleton Barrel - Evolution', image: require('./assets/cards/Barrel (1).png') },
  { id: 'Bats', name: 'Bats', image: require('./assets/cards/Bats.png') },
  { id: 'BatsEvo', name: 'Bats - Evolution', image: require('./assets/cards/Bats (1).png') },
  { id: 'BattleRam', name: 'Battle Ram', image: require('./assets/cards/Battle ram.png') },
  { id: 'BattleRamEvo', name: 'Battle Ram - Evolution', image: require('./assets/cards/Battle ram (1).png') },
  { id: 'BattleHealer', name: 'Battle Healer', image: require('./assets/cards/BattleHealer.png') },
  { id: 'Berserker', name: 'Berserker', image: require('./assets/cards/Berserker.png') },
  { id: 'Bomber', name: 'Bomber', image: require('./assets/cards/Bomber.png') },
  { id: 'BomberEvo', name: 'Bomber - Evolution', image: require('./assets/cards/Bomber (1).png') },
  { id: 'BombTower', name: 'Bomb Tower', image: require('./assets/cards/BombTower.png') },
  { id: 'BossBandit', name: 'Boss Bandit', image: require('./assets/cards/BossBandit.png') },
  { id: 'Bowler', name: 'Bowler', image: require('./assets/cards/Bowler.png') },
  { id: 'Cannon', name: 'Cannon', image: require('./assets/cards/Cannon.png') },
  { id: 'CannonEvo', name: 'Cannon - Evolution', image: require('./assets/cards/Cannon (1).png') },
  { id: 'CannonCart', name: 'Cannon Cart', image: require('./assets/cards/CannonCart.png') },
  { id: 'Clone', name: 'Clone', image: require('./assets/cards/Clone.png') },
  { id: 'DarkPrince', name: 'Dark Prince', image: require('./assets/cards/DarkPrince.png') },
  { id: 'DartGob', name: 'Dart Goblin', image: require('./assets/cards/DartGob.png') },
  { id: 'DartGobEvo', name: 'Dart Goblin - Evolution', image: require('./assets/cards/DartGob (1).png') },
  { id: 'Earthquake', name: 'Earthquake', image: require('./assets/cards/Earthquake.png') },
  { id: 'eBarbs', name: 'Elite Barbarians', image: require('./assets/cards/eBarbs.png') },
  { id: 'eDragon', name: 'Electro Dragon', image: require('./assets/cards/eDragon.png') },
  { id: 'eDragonEvo', name: 'Electro Dragon - Evolution', image: require('./assets/cards/eDragon (1).png') },
  { id: 'ElectroGiant', name: 'Electro Giant', image: require('./assets/cards/ElectroGiant.png') },
  { id: 'ElectroSpirit', name: 'Electro Spirit', image: require('./assets/cards/ElectroSpirit.png') },
  { id: 'ElixirGolem', name: 'Elixir Golem', image: require('./assets/cards/ElixirGolem.png') },
  { id: 'eWiz', name: 'Electro Wizard', image: require('./assets/cards/eWiz.png') },
  { id: 'Exe', name: 'Executioner', image: require('./assets/cards/Exe.png') },
  { id: 'ExeEvo', name: 'Executioner - Evolution', image: require('./assets/cards/Exe (1).png') },
  { id: 'Fireball', name: 'Fireball', image: require('./assets/cards/Fireball.png') },
  { id: 'Firecracker', name: 'Firecracker', image: require('./assets/cards/Firecracker.png') },
  { id: 'FirecrackerEvo', name: 'Firecracker - Evolution', image: require('./assets/cards/Firecracker (1).png') },
  { id: 'FireSpirit', name: 'Fire Spirit', image: require('./assets/cards/FireSpirit.png') },
  { id: 'Fisherman', name: 'Fisherman', image: require('./assets/cards/Fisherman.png') },
  { id: 'FlyingMachine', name: 'Flying Machine', image: require('./assets/cards/FlyingMachine.png') },
  { id: 'Freeze', name: 'Freeze', image: require('./assets/cards/Freeze.png') },
  { id: 'Furnace', name: 'Furnace', image: require('./assets/cards/Furnace.png') },
  { id: 'Ghost', name: 'Ghost', image: require('./assets/cards/Ghost.png') },
  { id: 'Giant', name: 'Giant', image: require('./assets/cards/Giant.png') },
  { id: 'GiantSkelly', name: 'Giant Skeleton', image: require('./assets/cards/GiantSkelly.png') },
  { id: 'GobGang', name: 'Goblin Gang', image: require('./assets/cards/GobGang.png') },
  { id: 'GobGiant', name: 'Goblin Giant', image: require('./assets/cards/GobGiant.png') },
  { id: 'GobGiantEvo', name: 'Goblin Giant - Evolution', image: require('./assets/cards/GobGiant (1).png') },
  { id: 'GobHut', name: 'Goblin Hut', image: require('./assets/cards/GobHut.png') },
  { id: 'GoblinCage', name: 'Goblin Cage', image: require('./assets/cards/GoblinCage.png') },
  { id: 'GoblinCageEvo', name: 'Goblin Cage - Evolution', image: require('./assets/cards/GoblinCage (1).png') },
  { id: 'GoblinCurse', name: 'Goblin Curse', image: require('./assets/cards/GoblinCurse.png') },
  { id: 'GoblinDemolisher', name: 'Goblin Demolisher', image: require('./assets/cards/GoblinDemolisher.png') },
  { id: 'GoblinDrill', name: 'Goblin Drill', image: require('./assets/cards/GoblinDrill.png') },
  { id: 'GoblinDrillEvo', name: 'Goblin Drill - Evolution', image: require('./assets/cards/GoblinDrill (1).png') },
  { id: 'GoblinMachine', name: 'Goblin Machine', image: require('./assets/cards/GoblinMachine.png') },
  { id: 'Goblinstein', name: 'Goblinstein', image: require('./assets/cards/Goblinstein.png') },
  { id: 'Gobs', name: 'Goblins', image: require('./assets/cards/Gobs.png') },
  { id: 'GoldenKnight', name: 'Golden Knight', image: require('./assets/cards/GoldenKnight.png') },
  { id: 'Golem', name: 'Golem', image: require('./assets/cards/Golem.png') },
  { id: 'Graveyard', name: 'Graveyard', image: require('./assets/cards/Graveyard.png') },
  { id: 'Guards', name: 'Guards', image: require('./assets/cards/Guards.png') },
  { id: 'HealSpirit', name: 'Heal Spirit', image: require('./assets/cards/HealSpirit.png') },
  { id: 'Hog', name: 'Hog Rider', image: require('./assets/cards/Hog.png') },
  { id: 'Horde', name: 'Skeleton Horde', image: require('./assets/cards/Horde.png') },
  { id: 'Hunter', name: 'Hunter', image: require('./assets/cards/Hunter.png') },
  { id: 'HunterEvo', name: 'Hunter - Evolution', image: require('./assets/cards/Hunter (1).png') },
  { id: 'IceGolem', name: 'Ice Golem', image: require('./assets/cards/IceGolem.png') },
  { id: 'IceSpirit', name: 'Ice Spirit', image: require('./assets/cards/IceSpirit.png') },
  { id: 'IceSpiritEvo', name: 'Ice Spirit - Evolution', image: require('./assets/cards/IceSpirit (1).png') },
  { id: 'IceWiz', name: 'Ice Wizard', image: require('./assets/cards/IceWiz.png') },
  { id: 'Inferno', name: 'Inferno Tower', image: require('./assets/cards/Inferno.png') },
  { id: 'InfernoD', name: 'Inferno Dragon', image: require('./assets/cards/InfernoD.png') },
  { id: 'InfernoDEvo', name: 'Inferno Dragon - Evolution', image: require('./assets/cards/InfernoD (1).png') },
  { id: 'Knight', name: 'Knight', image: require('./assets/cards/Knight.png') },
  { id: 'KnightEvo', name: 'Knight - Evolution', image: require('./assets/cards/Knight (1).png') },
  { id: 'Lava', name: 'Lava Hound', image: require('./assets/cards/Lava.png') },
  { id: 'Lightning', name: 'Lightning', image: require('./assets/cards/Lightning.png') },
  { id: 'LittlePrince', name: 'Little Prince', image: require('./assets/cards/LittlePrince.png') },
  { id: 'Log', name: 'The Log', image: require('./assets/cards/Log.png') },
  { id: 'Lumber', name: 'Lumberjack', image: require('./assets/cards/Lumber.png') },
  { id: 'LumberEvo', name: 'Lumberjack - Evolution', image: require('./assets/cards/Lumber (1).png') },
  { id: 'MagicArcher', name: 'Magic Archer', image: require('./assets/cards/MagicArcher.png') },
  { id: 'MegaKnight', name: 'Mega Knight', image: require('./assets/cards/MegaKnight.png') },
  { id: 'MegaKnightEvo', name: 'Mega Knight - Evolution', image: require('./assets/cards/MegaKnight (1).png') },
  { id: 'MightyMiner', name: 'Mighty Miner', image: require('./assets/cards/MightyMiner.png') },
  { id: 'Miner', name: 'Miner', image: require('./assets/cards/Miner.png') },
  { id: 'Minions', name: 'Minions', image: require('./assets/cards/Minions.png') },
  { id: 'Mirror', name: 'Mirror', image: require('./assets/cards/Mirror.png') },
  { id: 'MM', name: 'Mega Minion', image: require('./assets/cards/MM.png') },
  { id: 'Monk', name: 'Monk', image: require('./assets/cards/Monk.png') },
  { id: 'Mortar', name: 'Mortar', image: require('./assets/cards/Mortar.png') },
  { id: 'MortarEvo', name: 'Mortar - Evolution', image: require('./assets/cards/Mortar (1).png') },
  { id: 'MotherWitch', name: 'Mother Witch', image: require('./assets/cards/MotherWitch.png') },
  { id: 'MP', name: 'Mini P.E.K.K.A', image: require('./assets/cards/MP.png') },
  { id: 'Musk', name: 'Musketeer', image: require('./assets/cards/Musk.png') },
  { id: 'MuskEvo', name: 'Musketeer - Evolution', image: require('./assets/cards/Musk (1).png') },
  { id: 'NightWitch', name: 'Night Witch', image: require('./assets/cards/NightWitch.png') },
  { id: 'PEKKA', name: 'P.E.K.K.A', image: require('./assets/cards/PEKKA.png') },
  { id: 'PEKKAEvo', name: 'P.E.K.K.A - Evolution', image: require('./assets/cards/PEKKA (1).png') },
  { id: 'Phoenix', name: 'Phoenix', image: require('./assets/cards/Phoenix.png') },
  { id: 'Poison', name: 'Poison', image: require('./assets/cards/Poison.png') },
  { id: 'Prince', name: 'Prince', image: require('./assets/cards/Prince.png') },
  { id: 'Princess', name: 'Princess', image: require('./assets/cards/Princess.png') },
  { id: 'Pump', name: 'Pump', image: require('./assets/cards/Pump.png') },
  { id: 'Rage', name: 'Rage', image: require('./assets/cards/Rage.png') },
  { id: 'RamRider', name: 'Ram Rider', image: require('./assets/cards/RamRider.png') },
  { id: 'Rascals', name: 'Rascals', image: require('./assets/cards/Rascals.png') },
  { id: 'Rocket', name: 'Rocket', image: require('./assets/cards/Rocket.png') },
  { id: 'RoyalGiant', name: 'Royal Giant', image: require('./assets/cards/Royal giant.png') },
  { id: 'RoyalGiantEvo', name: 'Royal Giant - Evolution', image: require('./assets/cards/Royal giant (1).png') },
  { id: 'RoyalDelivery', name: 'Royal Delivery', image: require('./assets/cards/RoyalDelivery.png') },
  { id: 'RoyalHogs', name: 'Royal Hogs', image: require('./assets/cards/RoyalHogs.png') },
  { id: 'RoyalRecruits', name: 'Royal Recruits', image: require('./assets/cards/RoyalRecruits.png') },
  { id: 'RoyalRecruitsEvo', name: 'Royal Recruits - Evolution', image: require('./assets/cards/RoyalRecruits (1).png') },
  { id: 'RuneGiant', name: 'Royal Giant', image: require('./assets/cards/RuneGiant.png') },
  { id: 'SkeletonArmy', name: 'Skeleton Army', image: require('./assets/cards/Skeleton army.png') },
  { id: 'SkeletonBarrel', name: 'Skeleton Barrel', image: require('./assets/cards/Skeleton barrel.png') },
  { id: 'SkeletonDragons', name: 'Skeleton Dragons', image: require('./assets/cards/SkeletonDragons.png') },
  { id: 'SkeletonKing', name: 'Skeleton King', image: require('./assets/cards/SkeletonKing.png') },
  { id: 'Skeletons', name: 'Skeletons', image: require('./assets/cards/Skeletons.png') },
  { id: 'SkeletonsEvo', name: 'Skeletons - Evolution', image: require('./assets/cards/Skeletons (1).png') },
  { id: 'Snowball', name: 'Snowball', image: require('./assets/cards/Snowball.png') },
  { id: 'SnowballEvo', name: 'Snowball - Evolution', image: require('./assets/cards/Snowball (1).png') },
  { id: 'Sparky', name: 'Sparky', image: require('./assets/cards/Sparky.png') },
  { id: 'SpearGobs', name: 'Spear Goblins', image: require('./assets/cards/SpearGobs.png') },
  { id: 'SuspiciousBush', name: 'Suspicious Bush', image: require('./assets/cards/SuspiciousBush.png') },
  { id: 'Tesla', name: 'Tesla', image: require('./assets/cards/Tesla.png') },
  { id: 'TeslaEvo', name: 'Tesla - Evolution', image: require('./assets/cards/Tesla (1).png') },
  { id: 'Tombstone', name: 'Tombstone', image: require('./assets/cards/Tombstone.png') },
  { id: 'Tornado', name: 'Tornado', image: require('./assets/cards/Tornado.png') },
  { id: 'Valkyrie', name: 'Valkyrie', image: require('./assets/cards/Valkyrie.png') },
  { id: 'ValkyrieEvo', name: 'Valkyrie - Evolution', image: require('./assets/cards/Valkyrie (1).png') },
  { id: 'Void', name: 'Void', image: require('./assets/cards/Void.png') },
  { id: 'WallBreakers', name: 'Wall Breakers', image: require('./assets/cards/WallBreakers.png') },
  { id: 'WallBreakersEvo', name: 'Wall Breakers - Evolution', image: require('./assets/cards/WallBreakers (1).png') },
  { id: 'Witch', name: 'Witch', image: require('./assets/cards/Witch.png') },
  { id: 'WitchEvo', name: 'Witch - Evolution', image: require('./assets/cards/Witch (1).png') },
  { id: 'Wizard', name: 'Wizard', image: require('./assets/cards/Wizard.png') },
  { id: 'WizardEvo', name: 'Wizard - Evolution', image: require('./assets/cards/Wizard (1).png') },
  { id: 'XBow', name: 'X-Bow', image: require('./assets/cards/XBow.png') },
  { id: 'Zap', name: 'Zap', image: require('./assets/cards/Zap.png') },
  { id: 'ZapEvo', name: 'Zap - Evolution', image: require('./assets/cards/Zap (1).png') },
  { id: 'Zappies', name: 'Zappies', image: require('./assets/cards/Zappies.png') },
];

export default function App() {
  const [currentCard, setCurrentCard] = useState(null);
  const [numPlayers, setNumPlayers] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [imposterPlayer, setImposterPlayer] = useState(null);
  const [gamePhase, setGamePhase] = useState('setup'); // 'setup' | 'playing' | 'roundComplete'
  const [showCard, setShowCard] = useState(false);

  const startGame = (numPlayers) => {
    setNumPlayers(numPlayers);
    startNewRound();
  };

  const startNewRound = () => {
    // Randomly select a card
    const randomCard = CARD_DATA[Math.floor(Math.random() * CARD_DATA.length)];
    setCurrentCard(randomCard);

    // Randomly assign one player as the imposter (1 to numPlayers)
    const imposter = Math.floor(Math.random() * numPlayers) + 1;
    setImposterPlayer(imposter);

    // Reset to Player 1
    setCurrentPlayer(1);
    setShowCard(false);
    setGamePhase('playing');
  };

  const passToNextPlayer = () => {
    if (currentPlayer < numPlayers) {
      setCurrentPlayer(currentPlayer + 1);
      setShowCard(false);
    } else {
      // Round complete
      setGamePhase('roundComplete');
    }
  };

  const revealCard = () => {
    if (currentPlayer === imposterPlayer) {
      // Imposter doesn't see the card
      setShowCard(true); // Show imposter message
    } else {
      // Regular player sees the card
      setShowCard(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#1E5F97' }]}>
    
      <StatusBar style="light" />

      <LinearGradient
        colors={['#1a1f2e', '#0f1419', '#1a1f2e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.title}>CLASH ROYALE IMPOSTER</Text>
      </LinearGradient>

      {gamePhase === 'setup' && (
        <View style={styles.setupScreen}>
          <Text style={styles.instructions}>
            HOW MANY PLAYERS ARE PLAYING?
          </Text>
          <View style={styles.playerButtonsContainer}>
            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.playerButton}
                onPress={() => startGame(num)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#F7C843', '#E5B93A', '#D4A62A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.playerButtonGradient}
                >
                  <Text style={styles.playerButtonText}>{num}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {gamePhase === 'playing' && (
        <View style={styles.gameScreen}>
          <LinearGradient
            colors={['#F7C843', '#E5B93A', '#F7C843']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.playerHeader}
          >
            <Text style={styles.playerHeaderText}>PLAYER {currentPlayer}</Text>
          </LinearGradient>

          <TouchableOpacity
            style={[styles.cardButton, showCard && styles.cardButtonRevealed]}
            onPress={!showCard ? revealCard : undefined}
            disabled={showCard}
            activeOpacity={0.9}
          >
            <View style={[
              styles.cardFrame,
              showCard && currentPlayer === imposterPlayer && styles.cardFrameImposter
            ]}>
              {showCard ? (
                <View style={styles.cardContainer}>
                  {currentPlayer === imposterPlayer ? (
                    <View style={styles.imposterContainer}>
                      <Text style={styles.imposterText}>YOU'RE THE IMPOSTER!</Text>
                      <Text style={styles.imposterSubtext}>
                        YOU DON'T GET TO SEE THE CARD.{'\n'}
                        TRY TO BLEND IN WITH THE GROUP!
                      </Text>
                    </View>
                  ) : (
                    <>
                      {currentCard.image && (
                        <Image source={currentCard.image} style={styles.cardImage} />
                      )}
                      <Text style={styles.cardName}>{currentCard.name.toUpperCase()}</Text>
                    </>
                  )}
                </View>
              ) : (
                <Text style={styles.revealText}>TAP TO REVEAL CARD</Text>
              )}
            </View>
          </TouchableOpacity>

          {showCard && (
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.passButton}
                onPress={passToNextPlayer}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#3b82f6', '#2563eb', '#1e40af']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.passButtonGradient}
                >
                  <Text style={styles.passButtonText}>
                    {currentPlayer < numPlayers ? 'PASS TO NEXT PLAYER' : 'COMPLETE ROUND'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {gamePhase === 'roundComplete' && (
        <View style={styles.roundCompleteScreen}>
          <Text style={styles.roundCompleteText}>ROUND COMPLETE!</Text>
          <Text style={styles.roundCompleteSubtext}>
            ALL PLAYERS HAVE SEEN THE CARD.{'\n'}
          </Text>
          <TouchableOpacity style={styles.newRoundButton} onPress={startNewRound} activeOpacity={0.8}>
            <LinearGradient
              colors={['#F7C843', '#E5B93A', '#D4A62A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.newRoundButtonGradient}
            >
              <Text style={styles.newRoundButtonText}>START NEW ROUND</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFD700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#FFA500',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },
  setupScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructions: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 8,
  },
  playerButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  playerButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    margin: 5,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  playerButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  playerButtonText: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: '#FFFFFF',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 3,
  },
  playerHeader: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  playerHeaderText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 6,
  },
  startButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameScreen: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardButton: {
    borderRadius: 25,
    padding: 4,
    minHeight: 300,
    maxHeight: 350,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  cardButtonRevealed: {
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.3,
  },
  cardFrame: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#1a1f2e',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardFrameImposter: {
    borderColor: '#ff1744',
    borderWidth: 6,
    shadowColor: '#ff1744',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  revealText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 6,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 6,
  },
  imposterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imposterText: {
    color: '#ff1744',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: '#ff1744',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 8,
  },
  imposterSubtext: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
  controls: {
    marginTop: 50,
    width: '90%',
    marginBottom: 20,
  },
  passButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '100%',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
  },
  passButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 6,
  },
  roundCompleteScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roundCompleteText: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    textShadowColor: '#FFA500',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 12,
  },
  roundCompleteSubtext: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 28,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 8,
  },
  newRoundButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 15,
  },
  newRoundButtonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newRoundButtonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#FFFFFF',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },
});